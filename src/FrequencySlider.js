import React, { Component } from 'react'
import { withContentRect } from 'react-measure'

import { deltaCents, semitoneNames } from './audio.js'

const centerScale = 440 // A4
const centerSemitone = semitoneNames.indexOf('A4')
const centsOnScale = 325

const fillContainer = {
  width: '100%',
  height: '100%',
}

function deviceScaledBounds(bounds) {
  const ratio = window.devicePixelRatio

  return {
    width: Math.round(ratio * bounds.right) - Math.round(ratio * bounds.left),
    height: Math.round(ratio * bounds.bottom) - Math.round(ratio * bounds.top),
  }
}

class FrequencySlider extends Component {
  constructor(props) {
    super(props)
    this.setCanvasRef = element => {
      this.canvasEl = element
      this.props.measureRef(element)
    }
  }

  componentDidUpdate() {
    this.renderGraphics()
  }

  render() {
    return <canvas ref={this.setCanvasRef} style={fillContainer} />
  }

  renderGraphics() {
    const { canvasEl } = this
    if (!canvasEl) return
    const ctx = this.canvasEl.getContext('2d')
    const { frequency, contentRect } = this.props
    const { width, height } = deviceScaledBounds(contentRect.bounds)

    canvasEl.width = width
    canvasEl.height = height

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, width, height)

    // needle
    const halfWidth = 0.5 * width
    const halfHeight = 0.5 * height
    const needleWidth = 0.0075 * width
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.75)'
    ctx.lineWidth = needleWidth
    ctx.beginPath()
    ctx.moveTo(halfWidth, halfHeight)
    ctx.lineTo(halfWidth, height)
    ctx.closePath()
    ctx.stroke()

    // Semitone marks
    const pixelsPerCent = width / centsOnScale
    const centsFromCenterOfScale = deltaCents(frequency, centerScale)
    const centsFromCenterOfScreen = centsFromCenterOfScale % 100
    const centerOfScreenSemitone =
      centerSemitone + Math.floor(centsFromCenterOfScale / 100)
    ctx.strokeStyle = 'gray'
    ctx.lineWidth = needleWidth / 2
    ctx.font = `bold ${0.1 * height}px sans-serif`
    ctx.fillStyle = 'gray'
    ctx.textAlign = 'center'
    for (let i = -2; i <= 2; i++) {
      const x = halfWidth - (centsFromCenterOfScreen + 100 * i) * pixelsPerCent
      ctx.beginPath()
      ctx.moveTo(x, height * 0.67)
      ctx.lineTo(x, height)
      ctx.closePath()
      ctx.stroke()
      const name = semitoneNames[centerOfScreenSemitone - i]
      ctx.fillText(name, x, height * 0.64)
    }

    // numeric frequency label
    const margin = 0.1 * height
    ctx.font = `bold ${0.33 * height}px sans-serif`
    ctx.fillStyle = 'black'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.fillText(frequency, margin, margin)
  }
}

export default withContentRect('bounds')(FrequencySlider)
