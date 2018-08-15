import React, { Component } from 'react'
import './App.css'

import audio from './audio'

const frequencyStep = 10

class App extends Component {
  constructor(props) {
    super(props)

    this.toggleTone = this.toggleTone.bind(this)
    this.increaseFrequency = this.increaseFrequency.bind(this)
    this.decreaseFrequency = this.decreaseFrequency.bind(this)

    this.state = {
      tone: {
        frequency: 440,
        playing: false
      }
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
        tone: { ...tone, playing }
      }
    })
  }

  updateFrequency(amount) {
    this.setState(prevState => {
      const tone = prevState.tone
      const frequency = tone.frequency + amount
      audio.setFrequency(frequency)
      return {
        tone: { ...tone, frequency }
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
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Fiddle Tuner</h1>
        </header>
        <section className="App-display" />
        <section className="App-controls">
          <button onClick={this.toggleTone}>
            {this.state.tone.playing ? 'Stop' : 'Play'} Tone
          </button>
          <span>{this.state.tone.frequency}</span>
          <button onClick={this.increaseFrequency}>+</button>
          <button onClick={this.decreaseFrequency}>-</button>
        </section>
      </div>
    )
  }
}

export default App
