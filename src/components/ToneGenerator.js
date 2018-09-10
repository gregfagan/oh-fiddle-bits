import React, { Component } from 'react'

import ControlledDisplay from './ControlledDisplay'
import FrequencyInputSlider from './FrequencyInputSlider'
import ToneButton from './ToneButton'
import { createToneGenerator } from '../audio'

export default class ToneGenerator extends Component {
  generator = null
  state = {
    frequency: 440,
    playing: false,
  }

  componentDidUpdate(prevProps, prevState) {
    let { generator } = this
    const { frequency, playing } = this.state

    // toggle playing, create generator if necessary
    if (playing !== prevState.playing) {
      if (!generator) {
        generator = createToneGenerator()
        generator.setFrequency(frequency)
        this.generator = generator
      }

      if (prevState.playing) {
        generator.stop()
      } else {
        generator.start()
      }
    }

    // update frequency
    if (generator && frequency !== prevState.frequency) {
      generator.setFrequency(frequency)
    }
  }

  componentWillUnmount() {
    const { generator } = this
    if (generator) {
      generator.destroy()
    }
  }

  toggleTone = () => {
    this.setState(prevState => ({ playing: !prevState.playing }))
  }

  setFrequency = frequency => {
    this.setState({ frequency })
  }

  render() {
    const { playing, frequency } = this.state
    return (
      <ControlledDisplay
        display={
          <FrequencyInputSlider
            frequency={frequency}
            onFrequencyChange={this.setFrequency}
            pixelsPerCent={1.4}
          />
        }
        controls={
          <ToneButton
            on={playing}
            frequency={frequency}
            onClick={this.toggleTone}
          />
        }
      />
    )
  }
}
