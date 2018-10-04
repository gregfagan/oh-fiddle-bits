import React, { Component } from 'react'

import { Oscillator, Microphone } from '../audio'
import { InputSelector, ToneControls, MicControls } from './Controls'
import AnalysedDisplay from './Display'

import inputs from './inputs'

//
// A view with a variety of input streams and
// analyser options to help test accuracy
//

export default class TestAnalyser extends Component {
  state = {
    input: inputs.tone,
    inputSampleId: null,
    toneFrequency: 440,
    isRecording: false,
    samples: [],
  }

  selectInput = input => this.setState({ input })
  setToneFrequency = toneFrequency => this.setState({ toneFrequency })
  toggleRecording = () =>
    this.setState(state => ({ isRecording: !state.isRecording }))
  saveSample = sample =>
    this.setState(state => ({ samples: [...state.samples, sample] }))

  renderInputSelector = () => (
    <InputSelector current={this.state.input} onChange={this.selectInput} />
  )

  renderOscillator = () => (
    <Oscillator frequency={this.state.toneFrequency}>
      <AnalysedDisplay
        inputSelector={this.renderInputSelector()}
        controls={
          <ToneControls
            frequency={this.state.toneFrequency}
            onChange={this.setToneFrequency}
          />
        }
      />
    </Oscillator>
  )

  renderMicrophone = () => (
    <Microphone
      onRecordSample={this.state.isRecording ? this.saveSample : null}
    >
      <AnalysedDisplay
        inputSelector={this.renderInputSelector()}
        controls={
          <MicControls
            isRecording={this.state.isRecording}
            onChange={this.toggleRecording}
          />
        }
      />
    </Microphone>
  )

  render() {
    switch (this.state.input) {
      case inputs.tone:
        return this.renderOscillator()
      case inputs.mic:
        return this.renderMicrophone()
      default:
        return null
    }
  }
}
