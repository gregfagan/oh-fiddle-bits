import React, { Component } from 'react'
import styled from 'styled-components'
import { withContentRect } from 'react-measure'
import { easeElastic, easeExpInOut } from 'd3-ease'

import {
  deltaCents,
  addCents,
  notes,
  centerNote,
  centerFrequency,
  nearestNote,
  frequencyOfNote,
} from '../audio'

function lerp(t, min, max) {
  return min * (1 - t) + max * t
}

const snapDuration = 0.5

const Canvas = styled.canvas.attrs(
  // required for pointer events polyfill
  { 'touch-action': 'none' },
)`
  display: block;
  width: 100%;
  height: 100%;
  touch-action: none;
`

function deviceScaledBounds(bounds) {
  const ratio = window.devicePixelRatio

  return {
    width: Math.round(ratio * bounds.right) - Math.round(ratio * bounds.left),
    height: Math.round(ratio * bounds.bottom) - Math.round(ratio * bounds.top),
  }
}

class FrequencySlider extends Component {
  static defaultProps = {
    pixelsPerCent: 3,
  }

  canvasEl = null
  snapRefId = null
  state = {
    panning: false,
    panStart: null,
    startFrequency: 0,
    snapStart: null,
    snapToFrequency: 0,
  }

  setCanvasRef = element => {
    this.canvasEl = element
    this.props.measureRef(element)
  }

  componentDidUpdate() {
    this.renderGraphics()
  }

  render() {
    const { onFrequencyChange } = this.props

    return (
      <Canvas
        innerRef={this.setCanvasRef}
        onPointerDown={onFrequencyChange && this.startPanning}
        onPointerUp={onFrequencyChange && this.stopPanning}
        onPointerCancel={onFrequencyChange && this.stopPanning}
        onPointerOut={onFrequencyChange && this.stopPanning}
        onPointerMove={onFrequencyChange && this.pan}
      />
    )
  }

  startPanning = e => {
    const { frequency } = this.props

    if (this.snapRafId) {
      cancelAnimationFrame(this.snapRafId)
      this.snapRafId = undefined
    }

    this.setState({
      panning: true,
      panStart: e.nativeEvent.clientX,
      startFrequency: frequency,
    })
  }

  pan = e => {
    const { panning, panStart, startFrequency } = this.state
    const { onFrequencyChange, pixelsPerCent } = this.props

    if (!panning) return

    const panDelta = e.nativeEvent.clientX - panStart
    const centDelta = -panDelta / pixelsPerCent
    const newFrequency = addCents(startFrequency, centDelta)

    onFrequencyChange(newFrequency)
  }

  stopPanning = () => {
    const { panning } = this.state
    if (!panning) return

    this.setState((prevState, props) => {
      const { frequency } = props
      const snapToNote = nearestNote(frequency)
      const snapToFrequency = frequencyOfNote(snapToNote)
      return {
        panning: false,
        snapStart: performance.now(),
        startFrequency: frequency,
        snapToFrequency,
      }
    }, this.snap)
  }

  snap = () => {
    const { panning, snapStart, startFrequency, snapToFrequency } = this.state
    const { onFrequencyChange } = this.props
    if (panning) return

    const t = Math.min(
      (performance.now() - snapStart) / (snapDuration * 1000),
      1,
    )

    if (t < 1) {
      const cents = deltaCents(snapToFrequency, startFrequency)
      const newFrequency = addCents(startFrequency, easeElastic(t) * cents)
      onFrequencyChange(newFrequency)
      this.snapRafId = requestAnimationFrame(this.snap)
    } else {
      onFrequencyChange(snapToFrequency)
    }
  }

  renderGraphics() {
    const { canvasEl, props } = this
    if (!canvasEl) return
    const ctx = canvasEl.getContext('2d')
    const {
      frequency = 0,
      contentRect,
      pixelsPerCent: cssPixelsPerCent,
    } = props
    const { width: cssWidth } = contentRect.bounds
    const { width, height } = deviceScaledBounds(contentRect.bounds)

    canvasEl.width = width
    canvasEl.height = height

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, width, height)

    // needle
    const halfWidth = 0.5 * width
    const halfHeight = 0.5 * height
    const needleWidth = 7 * window.devicePixelRatio
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.75)'
    ctx.lineWidth = needleWidth
    ctx.beginPath()
    ctx.moveTo(halfWidth, halfHeight)
    ctx.lineTo(halfWidth, height)
    ctx.closePath()
    ctx.stroke()

    // Semitone marks
    const centsOnScale = cssWidth / cssPixelsPerCent
    const pixelsPerCent = width / centsOnScale
    const centsFromCenterOfScale = deltaCents(frequency, centerFrequency)
    const semitonesFromCenter = Math.floor((centsFromCenterOfScale + 50) / 100)
    const semitoneNearestCenter = centerNote + semitonesFromCenter
    const centsFromCenterOfScreen =
      centsFromCenterOfScale - semitonesFromCenter * 100

    ctx.textAlign = 'center'
    ctx.fillStyle = 'gray'
    ctx.strokeStyle = 'gray'
    const numberOfTicksOnEachSide = Math.ceil(centsOnScale / 200) + 1
    for (let i = -numberOfTicksOnEachSide; i <= numberOfTicksOnEachSide; i++) {
      // Semitone Tick
      ctx.lineWidth = needleWidth / 2
      const x = halfWidth - (centsFromCenterOfScreen + 100 * i) * pixelsPerCent
      ctx.beginPath()
      ctx.moveTo(x, height * 0.67)
      ctx.lineTo(x, height)
      ctx.closePath()
      ctx.stroke()

      // Semitone label
      const name = notes[semitoneNearestCenter - i]
      const t =
        i === 0 ? easeExpInOut(1 - Math.abs(centsFromCenterOfScreen / 50)) : 0
      const fontScale = lerp(t, 0.1, 0.2) * height
      const y = lerp(t, 0.64, 0.44) * height
      ctx.font = `bold ${fontScale}px sans-serif`
      ctx.fillText(name, x, y)

      // 10 cent division ticks
      if (cssPixelsPerCent > 1.75) {
        ctx.lineWidth = needleWidth / 3
        if (i !== -numberOfTicksOnEachSide) {
          for (let j = 1; j <= 9; j++) {
            const xt = x + j * 10 * pixelsPerCent
            ctx.beginPath()
            ctx.moveTo(xt, height * 0.9)
            ctx.lineTo(xt, height)
            ctx.closePath()
            ctx.stroke()
          }
        }
      }
    }

    // numeric frequency label
    const labelSize = Math.min(0.26 * height, 0.1 * width)
    const margin = 0.25 * labelSize
    ctx.font = `bold ${labelSize}px sans-serif`
    ctx.fillStyle = 'black'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.fillText(frequency.toFixed(1), margin, margin)
  }
}

export default withContentRect('bounds')(FrequencySlider)
