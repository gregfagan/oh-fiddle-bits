import React, { Component } from 'react'

import ControlledDisplay, { Button } from './ControlledDisplay'
import FrequencySlider from './FrequencySlider'
import { createMicAnalyser } from '../audio'

export default class Tuner extends Component {
  constructor(props) {
    super(props)
    this.toggleTuner = this.toggleTuner.bind(this)
    this.sample = this.sample.bind(this)
    this.state = {
      analyser: null,
      tuning: false,
      frequency: undefined,
    }
    this.rafId = null
  }

  componentWillUnmount() {
    const { analyser } = this.state
    if (analyser) analyser.stop()
    if (this.rafId) cancelAnimationFrame(this.rafId)
  }

  toggleTuner() {
    this.setState(prevState => {
      let { analyser, tuning } = prevState

      if (!analyser) {
        analyser = createMicAnalyser()
      }

      if (tuning) {
        analyser.stop()
        if (this.rafId) cancelAnimationFrame(this.rafId)
        tuning = false
      } else {
        analyser.start()
        this.rafId = requestAnimationFrame(this.sample)
        tuning = true
      }

      return { analyser, tuning }
    })
  }

  sample() {
    const { analyser, frequency: prevFrequency } = this.state
    const frequency = analyser.samplePitch()
    const frequencyChanged = frequency !== -1 && frequency !== prevFrequency

    if (frequencyChanged) {
      this.setState({ frequency })
    }

    this.rafId = requestAnimationFrame(this.sample)
  }

  render() {
    const { tuning, frequency } = this.state
    return (
      <ControlledDisplay
        display={<FrequencySlider frequency={frequency} />}
        controls={
          <Button onClick={this.toggleTuner}>{tuning ? 'Stop' : 'Tune'}</Button>
        }
      />
    )
  }
}
