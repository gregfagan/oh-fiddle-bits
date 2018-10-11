import React, { Component } from 'react'

import { Oscillator, Microphone, Sampler, Speakers, Analyser } from '../audio'
import {
  InputSelector,
  ToneControls,
  MicControls,
  SamplerControls,
} from './Controls'
import Display from './Display'

import inputs from './inputs'

//
// A view with a variety of input streams and
// analyser options to help test accuracy
//

const fftSize = 2 ** 15 // min 2 ** 5 max 2 ** 15
const maxFrequency = 6000

export default class TestAnalyser extends Component {
  state = {
    input: inputs.mic,
    toneFrequency: 440,
    isRecording: false,
    samples: [],
    currentSampleIndex: null,
    speakers: false,
  }

  selectInput = input => this.setState({ input })
  setToneFrequency = toneFrequency => this.setState({ toneFrequency })
  toggleRecording = () =>
    this.setState(state => ({ isRecording: !state.isRecording }))
  saveSample = sample =>
    this.setState(state => ({
      samples: [...state.samples, sample],
      currentSampleIndex: state.samples.length,
      input: inputs.sample,
    }))
  setCurrentSample = sampleIndex =>
    this.setState({ currentSampleIndex: sampleIndex })

  renderOutput = (source, controls) => {
    const { input, speakers } = this.state
    const shouldRenderSpeakers = speakers && input !== inputs.mic
    return (
      <>
        <Analyser source={source} fftSize={fftSize} maxFrequency={maxFrequency}>
          {(time, frequency, sampleRate, windowSize) => (
            <Display
              inputSelector={
                <InputSelector current={input} onChange={this.selectInput} />
              }
              controls={controls}
              time={time}
              frequency={frequency}
              sampleRate={sampleRate}
              windowSize={windowSize}
            />
          )}
        </Analyser>
        {shouldRenderSpeakers && <Speakers source={source} />}
      </>
    )
  }

  renderOscillator = () => (
    <Oscillator frequency={this.state.toneFrequency}>
      {source =>
        this.renderOutput(
          source,
          <ToneControls
            frequency={this.state.toneFrequency}
            onChange={this.setToneFrequency}
          />,
        )
      }
    </Oscillator>
  )

  renderMicrophone = () => (
    <Microphone
      onRecordSample={this.state.isRecording ? this.saveSample : null}
    >
      {source =>
        this.renderOutput(
          source,
          <MicControls
            isRecording={this.state.isRecording}
            onChange={this.toggleRecording}
          />,
        )
      }
    </Microphone>
  )

  renderSampler = () => {
    const { samples, currentSampleIndex } = this.state
    return (
      <Sampler sample={samples[currentSampleIndex]}>
        {source =>
          this.renderOutput(
            source,
            <SamplerControls
              samples={samples}
              currentSampleIndex={currentSampleIndex}
              setCurrentSample={this.setCurrentSample}
            />,
          )
        }
      </Sampler>
    )
  }

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
