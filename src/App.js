import React, { Component } from 'react'
import styled from 'styled-components'

import FrequencySlider from './FrequencySlider'
import audio from './audio'

const frequencyStep = 10

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #222;
  color: #eee;
`

const Header = styled.header`
  padding: 0px 20px;
`

const Title = styled.h1`
  font-size: 1.5em;
`

const Display = styled.section`
  flex: 1 1 100px;
  min-height: 0;
`

const Controls = styled.section`
  flex: 2;
  padding: 20px;
`

const Button = styled.button`
  background: transparent;
  color: #eee;
  border: 2px solid #eee;
  padding: 10px;
  margin-right: 20px;
  font-weight: bold;
  text-transform: uppercase;
`

class App extends Component {
  constructor(props) {
    super(props)

    this.toggleTone = this.toggleTone.bind(this)
    this.increaseFrequency = this.increaseFrequency.bind(this)
    this.decreaseFrequency = this.decreaseFrequency.bind(this)

    this.state = {
      tone: {
        frequency: 440,
        playing: false,
      },
    }
  }

  componentDidMount() {
    audio.init()
    audio.setFrequency(this.state.tone.frequency)
  }

  toggleTone() {
    this.setState(prevState => {
      const tone = prevState.tone
      const playing = !tone.playing

      if (playing) {
        audio.start(tone.frequency)
      } else {
        audio.stop()
      }

      return {
        tone: { ...tone, playing },
      }
    })
  }

  updateFrequency(amount) {
    this.setState(prevState => {
      const tone = prevState.tone
      const frequency = tone.frequency + amount
      audio.setFrequency(frequency)
      return {
        tone: { ...tone, frequency },
      }
    })
  }

  increaseFrequency() {
    this.updateFrequency(frequencyStep)
  }

  decreaseFrequency() {
    this.updateFrequency(-frequencyStep)
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>fiddle tuner</Title>
        </Header>
        <Display>
          <FrequencySlider frequency={this.state.tone.frequency} />
        </Display>
        <Controls>
          <Button onClick={this.toggleTone}>
            {this.state.tone.playing ? 'Stop' : 'Play'} Tone
          </Button>
          <Button onClick={this.increaseFrequency}>+</Button>
          <Button onClick={this.decreaseFrequency}>-</Button>
        </Controls>
      </Container>
    )
  }
}

export default App
