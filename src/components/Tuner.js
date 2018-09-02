import React, { Component } from 'react'
import styled from 'styled-components'

import ControlledDisplay from './ControlledDisplay'
import FrequencySlider from './FrequencySlider'
import { createMicAnalyser } from '../audio'

import { ReactComponent as MicIcon } from '../icon/mic.svg'

const MicIconWrapper = ({ on, ...rest }) => <MicIcon {...rest} />
const Mic = styled(MicIconWrapper)`
  height: 100%;
  path {
    fill: ${({ on }) => (on ? 'white' : 'black')};
  }
`

export default class Tuner extends Component {
  rafId = null
  analyser = null
  state = {
    tuning: false,
    frequency: undefined,
  }

  componentWillUnmount() {
    const { analyser, rafId } = this
    if (analyser) analyser.stop()
    if (rafId) cancelAnimationFrame(rafId)
  }

  createAnalyser(onComplete) {
    createMicAnalyser()
      .then(analyser => {
        this.analyser = analyser
        onComplete()
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  toggleTuner = () => {
    const { analyser, toggleTuner } = this

    if (!analyser) {
      // We don't have the micAnalyser set up yet. Getting permission from
      // the user is an async operation that can fail, so if successful, we'll
      // call this function again to turn it on
      this.createAnalyser(toggleTuner)
      return
    }

    this.setState(prevState => {
      const { rafId, sample } = this
      const { tuning } = prevState

      if (tuning) {
        analyser.stop()
        if (rafId) cancelAnimationFrame(rafId)
        return { tuning: false }
      } else {
        analyser.start()
        this.rafId = requestAnimationFrame(sample)
        return { tuning: true }
      }
    })
  }

  sample = () => {
    const { analyser, sample, state } = this
    const { frequency: prevFrequency } = state
    const frequency = analyser.samplePitch()
    const frequencyChanged = frequency !== -1 && frequency !== prevFrequency

    if (frequencyChanged) {
      this.setState({ frequency })
    }

    this.rafId = requestAnimationFrame(sample)
  }

  render() {
    const { error, tuning, frequency } = this.state
    return (
      <ControlledDisplay
        display={<FrequencySlider frequency={frequency} centsOnScale={350} />}
        controls={
          error ? (
            <span>Error: no microphone</span>
          ) : (
            <Mic on={tuning} onClick={this.toggleTuner} />
          )
        }
      />
    )
  }
}
