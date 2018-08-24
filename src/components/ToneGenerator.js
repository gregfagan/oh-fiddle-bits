import React, { Component, Fragment } from 'react'

import ControlledDisplay, { Button } from './ControlledDisplay'
import FrequencySlider from './FrequencySlider'
import { createToneGenerator, addCents } from '../audio'

const centStep = 10

export default class ToneGenerator extends Component {
  constructor(props) {
    super(props)

    this.toggleTone = this.toggleTone.bind(this)
    this.increaseFrequency = this.increaseFrequency.bind(this)
    this.decreaseFrequency = this.decreaseFrequency.bind(this)

    this.state = {
      generator: null,
      frequency: 440,
      playing: false,
    }
  }

  componentWillUnmount() {
    const { generator } = this.state
    if (generator) {
      generator.stop()
    }
  }

  toggleTone() {
    this.setState(prevState => {
      let { generator, frequency, playing } = prevState

      if (!generator) {
        generator = createToneGenerator()
        generator.setFrequency(frequency)
      }

      if (playing) {
        generator.stop()
        playing = false
      } else {
        generator.start()
        playing = true
      }

      return { generator, playing }
    })
  }

  changeFrequency(step) {
    this.setState(prevState => {
      const { generator } = prevState
      let { frequency } = prevState
      frequency = addCents(frequency, step)
      if (generator) generator.setFrequency(frequency)
      return { frequency }
    })
  }

  increaseFrequency() {
    this.changeFrequency(centStep)
  }

  decreaseFrequency() {
    this.changeFrequency(-centStep)
  }

  render() {
    const { playing, frequency } = this.state
    return (
      <ControlledDisplay
        display={<FrequencySlider frequency={frequency} />}
        controls={
          <Fragment>
            <Button onClick={this.toggleTone}>
              {playing ? 'Stop' : 'Play'}
            </Button>
            <Button onClick={this.increaseFrequency}>+</Button>
            <Button onClick={this.decreaseFrequency}>-</Button>
          </Fragment>
        }
      />
    )
  }
}
