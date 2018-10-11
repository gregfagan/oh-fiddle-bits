import React, { Component } from 'react'

import ControlledDisplay from '../ui/ControlledDisplay'
import FrequencyInputSlider from '../ui/FrequencyInputSlider'
import ToneButton from '../ui/buttons/ToneButton'
import { Oscillator, Speakers } from '../audio'

export default class ToneGenerator extends Component {
  state = {
    frequency: 440,
    isPlaying: false,
  }

  toggleTone = () =>
    this.setState(prevState => ({ isPlaying: !prevState.isPlaying }))

  setFrequency = frequency => this.setState({ frequency })

  render() {
    const { isPlaying, frequency } = this.state
    return (
      <>
        <Oscillator frequency={frequency}>
          {source => (isPlaying ? <Speakers source={source} /> : null)}
        </Oscillator>

        <ControlledDisplay
          display={
            <FrequencyInputSlider
              frequency={frequency}
              onFrequencyChange={this.setFrequency}
              pixelsPerCent={0.75}
            />
          }
          controls={<ToneButton on={isPlaying} onClick={this.toggleTone} />}
        />
      </>
    )
  }
}
