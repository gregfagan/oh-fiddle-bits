import React, { Component } from 'react'

import ControlledDisplay from './ControlledDisplay'
import FrequencySlider from './FrequencySlider'
import ToneButton from './ToneButton'
import { createToneGenerator } from '../audio'

export default class ToneGenerator extends Component {
  state = {
    generator: null,
    frequency: 440,
    playing: false,
  }

  componentWillUnmount() {
    const { generator } = this.state
    if (generator) {
      generator.stop()
    }
  }

  toggleTone = () => {
    this.setState(prevState => {
      let { generator, frequency, playing } = prevState

      if (!generator) {
        generator = createToneGenerator()
        generator.setFrequency(frequency)
      }

      if (playing) {
        generator.stop()
        playing = false
      } else {
        generator.start()
        playing = true
      }

      return { generator, playing }
    })
  }

  setFrequency = frequency => {
    this.setState(prevState => {
      const { generator } = prevState
      if (generator) generator.setFrequency(frequency)
      return { frequency }
    })
  }

  render() {
    const { playing, frequency } = this.state
    return (
      <ControlledDisplay
        display={
          <FrequencySlider
            frequency={frequency}
            onFrequencyChange={this.setFrequency}
            centsOnScale={825}
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
