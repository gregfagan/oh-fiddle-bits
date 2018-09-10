import React, { Component } from 'react'
import styled from 'styled-components'

import FrequencySlider from '../../components/FrequencySlider'
import FrequencyInputSlider from '../../components/FrequencyInputSlider'
import Flex from '../../components/Flex'

import createTestAnalyser from '../audio/testAnalyser'

const Container = styled(Flex)`
  padding-bottom: 1.5em;
`

const Label = styled(Flex)`
  flex: 0 0 auto;
  text-transform: lowercase;
  padding: 1em;
  font-family: ${props => props.theme.text.family.display};
  color: ${props => props.theme.text};
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
      <Container>
        <LabelledDisplay label="Generated">
          <FrequencyInputSlider
            frequency={inputF}
            onFrequencyChange={this.setFrequency}
          />
        </LabelledDisplay>
        <LabelledDisplay label="Detected">
          <FrequencySlider frequency={outputF} />
        </LabelledDisplay>
      </Container>
    )
  }
}
