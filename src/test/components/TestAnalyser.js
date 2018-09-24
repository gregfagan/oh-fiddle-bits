import React, { Component } from 'react'
import styled from 'styled-components'

import FrequencyInputSlider from '../../components/FrequencyInputSlider'
import Flex from '../../components/Flex'

import MicButton from '../../components/MicButton'
import ToneButton from '../../components/ToneButton'
import RecordButton from './RecordButton'

import TestView from './TestView'

import createTestAnalyser from '../audio/testAnalyser'

//
// A view with a variety of input streams and
// analyser options to help test accuracy
//

const fftSize = 2 ** 15 // min 2 ** 5 max 2 ** 15
const maxFreq = 6000

const Buttons = styled(Flex)`
  flex-grow: 0.2;
  > * {
    margin: 5%;
  }
`

const BlankDisplay = styled(Flex)`
  background: ${props => props.theme.info.background};
  justify-content: center;
  align-items: center;
  font-family: ${props => props.theme.text.family.display};
  color: ${props => props.theme.info.secondary};
  font-size: 2.5em;
  text-align: center;
`

const InputControls = ({ buttons, children }) => (
  <Flex row>
    <Buttons>{buttons}</Buttons>
    <Flex>{children}</Flex>
  </Flex>
)

export default class TestAnalyser extends Component {
  state = {
    useMicrophone: false,
    isRecording: false,
    recordings: [],
    inputF: 440,
    autoF: undefined,
    hps: undefined,
    hss: undefined,
  }

  buffers = {}

  componentDidMount() {
    this.createAnalyser()
  }

  componentDidUpdate(prevProps, prevState) {
    const { inputF } = this.state
    if (prevState.inputF !== inputF) {
      this.analyser.setFrequency(inputF)
    }
  }

  componentWillUnmount() {
    const { analyser, rafId } = this
    if (analyser) analyser.destroy()
    if (rafId) cancelAnimationFrame(rafId)
  }

  createAnalyser = () => {
    const { useMicrophone, isRecording } = this.state
    createTestAnalyser(
      fftSize,
      maxFreq,
      useMicrophone,
      isRecording && this.finishedRecording,
    )
      .then(analyser => {
        if (this.analyser) this.analyser.destroy()
        this.analyser = analyser
        this.buffers = analyser.getBuffers()
        if (!useMicrophone) analyser.setFrequency(this.state.inputF)
        if (!this.rafId) this.rafId = requestAnimationFrame(this.sample)

        analyser.start()
      })
      .catch(error => console.error(error))
  }

  setFrequency = frequency => {
    this.setState({ inputF: frequency })
  }

  sample = () => {
    const { analyser, sample } = this
    analyser.sample()
    this.setState({
      autoF: analyser.getAutoFreq(),
      hps: analyser.getHarmonicProduct(),
      hss: analyser.getHarmonicSum(),
    })

    this.rafId = requestAnimationFrame(sample)
  }

  switchInputs = () => {
    this.setState(
      state => ({ useMicrophone: !state.useMicrophone, isRecording: false }),
      this.createAnalyser,
    )
  }

  toggleRecording = () => {
    this.setState(
      state => ({
        useMicrophone: true,
        isRecording: !state.isRecording,
      }),
      this.createAnalyser,
    )
  }

  finishedRecording = recording => {
    this.setState(state => ({
      recordings: [
        ...state.recordings,
        { blob: recording, url: window.URL.createObjectURL(recording) },
      ],
    }))
  }

  render() {
    const {
      buffers,
      state: { useMicrophone, isRecording, inputF, autoF, hps, hss },
    } = this
    return (
      <TestView
        controls={
          <InputControls
            buttons={
              <>
                <ToneButton
                  on={!useMicrophone}
                  onClick={useMicrophone ? this.switchInputs : undefined}
                />
                <MicButton
                  on={useMicrophone}
                  onClick={!useMicrophone ? this.switchInputs : undefined}
                />
                <RecordButton on={isRecording} onClick={this.toggleRecording} />
              </>
            }
          >
            {useMicrophone ? (
              <BlankDisplay>{`microphone${
                isRecording ? '\n(recording)' : ''
              }`}</BlankDisplay>
            ) : (
              <FrequencyInputSlider
                frequency={inputF}
                pixelsPerCent={0.5}
                onFrequencyChange={this.setFrequency}
              />
            )}
          </InputControls>
        }
        displays={[
          { label: 'autocorrelated', frequency: autoF },
          { label: 'HSS', frequency: hss },
          { label: 'HPS', frequency: hps },
        ]}
        frequencyData={buffers.frequency}
        timeData={buffers.time}
      />
    )
  }
}
