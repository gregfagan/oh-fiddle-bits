import React, { Component } from 'react'
import { withContentRect } from 'react-measure'

const fillContainer = {
  width: '100%',
  height: '100%',
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
    const { contentRect } = this.props
    const { width, height } = contentRect.bounds
    return (
      <canvas
        ref={this.setCanvasRef}
        style={fillContainer}
        width={width}
        height={height}
      />
    )
  }

  renderGraphics() {
    if (!this.canvasEl) return
    const ctx = this.canvasEl.getContext('2d')
    const { frequency, contentRect } = this.props
    const { width, height } = contentRect.bounds

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
    ctx.font = `${0.33 * height}px sans`
    ctx.fillStyle = 'black'
    ctx.fillText(frequency, margin, height - margin)
  }
}

export default withContentRect('bounds')(FrequencySlider)
