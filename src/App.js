import React, { Component } from 'react'
import './App.css'

import audio from './audio'

class App extends Component {
  constructor(props) {
    super(props)

    this.toggleTone = this.toggleTone.bind(this)

    this.state = {
      playingTone: false
    }
  }

  componentDidMount() {
    audio.init()
  }

  toggleTone() {
    this.setState(prevState => {
      const playingTone = !prevState.playingTone

      if (playingTone) {
        audio.start()
      } else {
        audio.stop()
      }

      return {
        playingTone
      }
    })
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
            {this.state.playingTone ? 'Stop' : 'Play'} A4 Tone
          </button>
        </section>
      </div>
    )
  }
}

export default App
