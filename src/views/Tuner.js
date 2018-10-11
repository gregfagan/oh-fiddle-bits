import React, { PureComponent } from 'react'

import ControlledDisplay from '../ui/ControlledDisplay'
import FrequencySlider from '../ui/FrequencySlider'
import MicButton from '../ui/buttons/MicButton'

import { Microphone, Analyser } from '../audio'
import { harmonicSumSpectrum } from '../audio/signal'

export default class Tuner extends PureComponent {
  state = {
    tuning: false,
  }

  toggleTuner = () =>
    this.setState(prevState => ({
      tuning: !prevState.tuning,
    }))

  render() {
    const { tuning } = this.state
    return (
      <ControlledDisplay
        display={tuning ? <Output /> : <FrequencySlider />}
        controls={<MicButton on={tuning} onClick={this.toggleTuner} />}
      />
    )
  }
}

const Output = () => (
  <Microphone>
    {source => (
      <Analyser source={source}>
        {(time, frequency, sampleRate, windowSize) => (
          <AnalysedFrequencySlider
            frequency={frequency}
            windowSize={windowSize}
          />
        )}
      </Analyser>
    )}
  </Microphone>
)

const AnalysedFrequencySlider = ({ frequency, windowSize }) => (
  <FrequencySlider
    frequency={harmonicSumSpectrum(frequency.normalized, windowSize, 5)}
    pixelsPerCent={3}
  />
)
