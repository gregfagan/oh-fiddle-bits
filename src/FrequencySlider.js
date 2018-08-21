import React, { Component } from 'react'
import { withContentRect } from 'react-measure'

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
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 0.0075 * width
    ctx.beginPath()
    ctx.moveTo(halfWidth, halfHeight)
    ctx.lineTo(halfWidth, height)
    ctx.closePath()
    ctx.stroke()

    // numeric frequency label
    const margin = 0.1 * height
    ctx.font = `bold ${0.33 * height}px sans-serif`
    ctx.fillStyle = 'black'
    ctx.fillText(frequency, margin, height - margin)
  }
}

export default withContentRect('bounds')(FrequencySlider)
