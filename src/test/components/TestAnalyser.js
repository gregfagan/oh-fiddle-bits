import React, { Component } from 'react'
import styled from 'styled-components'

import FrequencySlider from '../../components/FrequencySlider'
import Flex from '../../components/Flex'

import createTestAnalyser from '../audio/testAnalyser'

const Label = styled(Flex)`
  flex: 0 0 auto;
  font-size: 1.5em;
  text-transform: uppercase;
  padding: 1.5em;
  padding-bottom: 0.5em;
  font-weight: bolder;
  color: red;
`
const LabelledDisplay = ({ label, children: display }) => (
  <Flex>
    <Label>{label}</Label>
    <Flex>{display}</Flex>
  </Flex>
)

// Generates a tone and feeds it back into the
// analyser to help test its accuracy
export default class TestAnalyser extends Component {
  state = {
    inputF: 440,
    outputF: undefined,
  }

  componentDidMount() {
    const analyser = createTestAnalyser()
    analyser.setFrequency(this.state.inputF)
    analyser.start()
    this.analyser = analyser
    this.rafId = requestAnimationFrame(this.sample)
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

  setFrequency = frequency => {
    this.setState({ inputF: frequency })
  }

  sample = () => {
    this.setState({
      outputF: this.analyser.samplePitch(),
    })

    this.rafId = requestAnimationFrame(this.sample)
  }

  render() {
    const { inputF, outputF } = this.state
    return (
      <>
        <LabelledDisplay label="Generated">
          <FrequencySlider
            frequency={inputF}
            onFrequencyChange={this.setFrequency}
          />
        </LabelledDisplay>
        <LabelledDisplay label="Detected">
          <FrequencySlider frequency={outputF} />
        </LabelledDisplay>
      </>
    )
  }
}
