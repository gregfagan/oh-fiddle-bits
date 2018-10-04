import React, { Component } from 'react'
import { easeElastic } from 'd3-ease'

import pannable from './pannable'
import FrequencySlider, { defaultProps } from './FrequencySlider'
import { addCents, deltaCents, nearestNote, frequencyOfNote } from '../audio'

//
// Like FrequencySlider, except you can pan it left or right to
// select a note, and it will snap to the nearest one.
//

const snapDurationMS = 1000
const PannableFrequencySlider = pannable(FrequencySlider)

export default class FrequencyInputSlider extends Component {
  static defaultProps = defaultProps

  snapping = {
    rafId: null,
    start: undefined,
    from: undefined,
    to: undefined,
  }

  componentWillUnmount() {
    this.stopSnapping()
  }

  render() {
    const { onFrequencyChange, ...rest } = this.props
    return (
      <PannableFrequencySlider
        onPanStart={this.stopSnapping}
        onPan={this.onPan}
        onPanEnd={this.onPanEnd}
        {...rest}
      />
    )
  }

  onPan = delta => {
    const { frequency, onFrequencyChange, pixelsPerCent } = this.props
    const deltaCents = -delta.x / pixelsPerCent
    const newFrequency = addCents(frequency, deltaCents)
    onFrequencyChange(newFrequency)
  }

  onPanEnd = total => {
    const { frequency } = this.props
    if (Math.abs(total.x) > 0) {
      this.snapping = {
        start: performance.now(),
        from: frequency,
        to: frequencyOfNote(nearestNote(frequency)),
      }
      this.snap()
    }
  }

  snap = () => {
    const { onFrequencyChange } = this.props
    const { start, from, to } = this.snapping
    const t = Math.min((performance.now() - start) / snapDurationMS, 1)

    if (t < 1) {
      const cents = deltaCents(to, from)
      const newFrequency = addCents(from, easeElastic(t) * cents)
      onFrequencyChange(newFrequency)
      this.snapping.rafId = requestAnimationFrame(this.snap)
    } else {
      onFrequencyChange(to)
    }
  }

  stopSnapping = () => {
    const { rafId } = this.snapping
    if (rafId) cancelAnimationFrame(rafId)
  }
}
