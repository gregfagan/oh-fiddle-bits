import React, { Component } from 'react'

import { Oscillator, Microphone, Sampler } from '../audio'
import {
  InputSelector,
  ToneControls,
  MicControls,
  SamplerControls,
} from './Controls'
import AnalysedDisplay from './Display'

import inputs from './inputs'

//
// A view with a variety of input streams and
// analyser options to help test accuracy
//

export default class TestAnalyser extends Component {
  state = {
    input: inputs.tone,
    toneFrequency: 440,
    isRecording: false,
    samples: [],
    currentSampleIndex: null,
  }

  selectInput = input => this.setState({ input })
  setToneFrequency = toneFrequency => this.setState({ toneFrequency })
  toggleRecording = () =>
    this.setState(state => ({ isRecording: !state.isRecording }))
  saveSample = sample =>
    this.setState(state => ({
      samples: [...state.samples, sample],
      currentSampleIndex: state.currentSampleIndex || 0,
    }))

  renderDisplayWithControls = controls => (
    <AnalysedDisplay
      inputSelector={
        <InputSelector current={this.state.input} onChange={this.selectInput} />
      }
      controls={controls}
    />
  )

  renderOscillator = () => (
    <Oscillator frequency={this.state.toneFrequency}>
      {this.renderDisplayWithControls(
        <ToneControls
          frequency={this.state.toneFrequency}
          onChange={this.setToneFrequency}
        />,
      )}
    </Oscillator>
  )

  renderMicrophone = () => (
    <Microphone
      onRecordSample={this.state.isRecording ? this.saveSample : null}
    >
      {this.renderDisplayWithControls(
        <MicControls
          isRecording={this.state.isRecording}
          onChange={this.toggleRecording}
        />,
      )}
    </Microphone>
  )

  renderSampler = () => (
    <Sampler sample={this.state.samples[this.state.currentSampleIndex]}>
      {this.renderDisplayWithControls(
        <SamplerControls samples={this.state.samples} />,
      )}
    </Sampler>
  )

  render() {
    switch (this.state.input) {
      case inputs.tone:
        return this.renderOscillator()
      case inputs.mic:
        return this.renderMicrophone()
      case inputs.sample:
        return this.renderSampler()
      default:
        return null
    }
  }
}
