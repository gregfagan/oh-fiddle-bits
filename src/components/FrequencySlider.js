import React, { Component } from 'react'
import styled, { withTheme } from 'styled-components'
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

const hz = 'Hz'
const snapDuration = 0.5
const needleWidth = 5

const Canvas = styled.canvas.attrs(
  // required for pointer events polyfill
  { 'touch-action': 'none' },
)`
  display: block;
  width: 100%;
  height: 100%;
  touch-action: none;
`

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
        ref={this.setCanvasRef}
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
    const { theme, contentRect } = props
    if (!canvasEl) return

    // To support hi-dpi screens, directly set the width and height
    // of the canvas element to bounds scaled by the devicePixelRatio.
    // The canvas CSS rules keep it fit to the CSS pixel layout, but
    // during render we are drawing to a higher resolution canvas.
    const { width, height } = deviceScaledBounds(contentRect.bounds)
    canvasEl.width = width
    canvasEl.height = height

    const ctx = canvasEl.getContext('2d')
    ctx.fillStyle = theme.info.background
    ctx.fillRect(0, 0, width, height)

    this.renderScale(ctx, width, height)
    this.renderNeedle(ctx, width, height)
    this.renderFrequency(ctx, width, height)
  }

  renderScale(ctx, width, height) {
    const {
      frequency,
      theme,
      contentRect,
      pixelsPerCent: cssPixelsPerCent,
    } = this.props

    // No scale without a frequency
    if (!frequency) return

    // Determine how many cents fit in the width of the canvas.
    // pixelsPerCent is in CSS pixels, so we need to rescale them
    // to our actual canvas width.
    const { width: cssWidth } = contentRect.bounds
    const centsOnScale = cssWidth / cssPixelsPerCent
    const pixelsPerCent = width / centsOnScale

    // Measure which semitone is closest to center, how far from center
    // it is, and how many semitones are visible on each side
    const centsFromCenterOfScale = deltaCents(frequency, centerFrequency)
    const semitonesFromCenter = Math.floor((centsFromCenterOfScale + 50) / 100)
    const semitoneNearestCenter = centerNote + semitonesFromCenter
    const centsFromCenterOfScreen =
      centsFromCenterOfScale - semitonesFromCenter * 100
    const numberOfTicksOnEachSide = Math.ceil(centsOnScale / 200) + 1

    // If there is enough room between semitones,
    // draw 10 cent tick marks as well
    const shouldDrawMinorTicks = cssPixelsPerCent > 1.75

    // Semitone marks
    const center = 0.5 * width
    const tickLength = 0.2 * height
    const y1 = height
    const y2 = height - tickLength
    for (let i = -numberOfTicksOnEachSide; i <= numberOfTicksOnEachSide; i++) {
      // Semitone Tick
      ctx.fillStyle = i === 0 ? theme.info.primary : theme.info.secondary
      ctx.strokeStyle = i === 0 ? theme.info.primary : theme.info.secondary
      ctx.lineWidth = deviceScaled(needleWidth) / 2
      const x = center - (centsFromCenterOfScreen + 100 * i) * pixelsPerCent
      strokeVertical(ctx, x, y1, y2)

      // Semitone label
      //
      // The semitone label nearest to the center is moved up
      // and scaled based on its distance to the needle
      const name = notes[semitoneNearestCenter - i]
      const t =
        i === 0 ? easeExpInOut(1 - Math.abs(centsFromCenterOfScreen / 50)) : 0
      const fontSize = lerp(t, 0.1, 0.3) * height
      const y = lerp(t, 0.71, 0.45) * height
      this.renderNoteLabel(ctx, x, y, fontSize, name)

      // 10 cent division ticks
      if (shouldDrawMinorTicks && i !== -numberOfTicksOnEachSide) {
        ctx.strokeStyle = theme.info.secondary
        ctx.lineWidth = deviceScaled(needleWidth) / 3
        const minorTickLength = height * 0.1
        const y2 = height - minorTickLength
        for (let j = 1; j <= 9; j++) {
          const xt = x + j * 10 * pixelsPerCent
          strokeVertical(ctx, xt, y1, y2)
        }
      }
    }
  }

  renderNoteLabel(ctx, x, y, size, note) {
    // extract the parts of the note name by destructuring assignment,
    // example: name A, sharp? ♯, octave 4
    let name, sharp, octave
    if (note.length < 3) {
      ;[name, octave] = [...note]
    } else {
      ;[name, sharp, octave] = [...note]
    }

    // Create font strings and then measure everything.
    const nameFont = this.fontOfSize(size)
    const octaveFont = this.displayFontOfSize(0.5 * size)
    let sharpFont
    let nameSize, sharpSize, octaveSize
    ctx.font = nameFont
    nameSize = ctx.measureText(name)
    if (sharp) {
      sharpFont = this.displayFontOfSize(0.6 * size)
      ctx.font = sharpFont
      sharpSize = ctx.measureText(sharp)
    }
    ctx.font = octaveFont
    octaveSize = ctx.measureText(octave)

    // With everything measured, calculate the total widths and x positions.
    // When a sharp is present, the octave number is moved out to the right
    // slightly but not by the full width of the sharp character.
    const sharpWidth = sharpSize ? sharpSize.width * 0.6 : 0
    const totalWidth = nameSize.width + sharpWidth + octaveSize.width
    const dx = -0.5 * totalWidth
    const nameX = x + dx
    const sharpX = nameX + nameSize.width
    const octaveX = sharpX + sharpWidth

    // Draw the text.
    ctx.font = nameFont
    ctx.fillText(name, nameX, y)
    if (sharp) {
      ctx.font = sharpFont
      ctx.fillText(sharp, sharpX, y - 0.3 * size)
    }
    ctx.font = octaveFont
    ctx.fillText(octave, octaveX, y + 0.25 * size)
  }

  renderNeedle(ctx, width, height) {
    ctx.strokeStyle = this.props.theme.shades.accent
    ctx.lineWidth = deviceScaled(needleWidth)
    const x = 0.5 * width
    const needleLength = 0.45 * height
    const y1 = height
    const y2 = height - needleLength
    strokeVertical(ctx, x, y1, y2)
  }

  renderFrequency(ctx, width, height) {
    const { frequency = 0, theme } = this.props

    const size = Math.min(0.15 * height, 0.1 * width)
    const marginTop = 0.2 * size
    const marginRight = 1.8 * marginTop
    const x = width - marginRight
    const y = size + marginTop

    const frequencyFont = this.fontOfSize(size)
    const hzFont = this.displayFontOfSize(size * 0.5)

    ctx.textAlign = 'right'
    ctx.fillStyle = theme.info.secondary
    ctx.font = hzFont
    ctx.fillText(hz, x, y)
    const { width: hzWidth } = ctx.measureText(hz)
    ctx.fillStyle = theme.info.primary
    ctx.font = frequencyFont
    ctx.fillText(frequency.toFixed(1), x - hzWidth, y)
  }

  fontOfSize(size) {
    return `bold ${size}px ${this.props.theme.text.family.interface}`
  }

  displayFontOfSize(size) {
    return `${size}px ${this.props.theme.text.family.display}`
  }
}

export default withContentRect('bounds')(withTheme(FrequencySlider))

//
// Utility funcitons
//

function lerp(t, min, max) {
  return min * (1 - t) + max * t
}

function deviceScaled(x) {
  return x * window.devicePixelRatio
}

function deviceScaledBounds(bounds) {
  return {
    width:
      Math.round(deviceScaled(bounds.right)) -
      Math.round(deviceScaled(bounds.left)),
    height:
      Math.round(deviceScaled(bounds.bottom)) -
      Math.round(deviceScaled(bounds.top)),
  }
}

function strokeVertical(ctx, x, y1, y2) {
  ctx.beginPath()
  ctx.moveTo(x, y1)
  ctx.lineTo(x, y2)
  ctx.closePath()
  ctx.stroke()
}
