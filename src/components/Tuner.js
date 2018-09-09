import React, { PureComponent } from 'react'
import styled from 'styled-components'

import Flex from './Flex'
import ControlledDisplay from './ControlledDisplay'
import FrequencySlider from './FrequencySlider'
import MicButton from './MicButton'
import { createMicAnalyser } from '../audio'

const Error = styled(Flex)`
  align-items: center;
  justify-content: center;
`

export default class Tuner extends PureComponent {
  rafId = null
  analyser = null
  state = {
    tuning: false,
    frequency: undefined,
    error: undefined,
  }

  componentDidUpdate(prevProps, prevState) {
    const { analyser } = this
    const { tuning } = this.state

    if (tuning !== prevState.tuning) {
      // If this is the first time to enable the tuner, we need
      // to create the analyser. This is an async operation, so
      // when it's done we'll go ahead and start it.
      if (!analyser) {
        createMicAnalyser()
          .then(analyser => {
            this.analyser = analyser
            this.startTuner()
          })
          .catch(error => {
            console.error(error)
            this.setState({ error })
          })
      } else if (tuning) {
        this.startTuner()
      } else {
        this.stopTuner()
      }
    }
  }

  componentWillUnmount() {
    const { analyser, rafId } = this
    if (analyser) analyser.destroy()
    if (rafId) cancelAnimationFrame(rafId)
  }

  startTuner() {
    this.analyser.start()
    this.rafId = requestAnimationFrame(this.sample)
  }

  stopTuner() {
    this.analyser.stop()
    cancelAnimationFrame(this.rafId)
  }

  toggleTuner = () => {
    this.setState(prevState => ({
      tuning: !prevState.tuning,
    }))
  }

  sample = () => {
    const { analyser, sample } = this

    const frequency = analyser.samplePitch()
    // Don't change the frequency back to undefined;
    // leave the display at the last seen frequency
    if (frequency !== undefined) {
      this.setState({ frequency })
    }

    this.rafId = requestAnimationFrame(sample)
  }

  render() {
    const { error, tuning, frequency } = this.state
    return error ? (
      <Error>error: no microphone</Error>
    ) : (
      <ControlledDisplay
        display={<FrequencySlider frequency={frequency} pixelsPerCent={3} />}
        controls={<MicButton on={tuning} onClick={this.toggleTuner} />}
      />
    )
  }
}
