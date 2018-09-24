import React, { Component } from 'react'
import { withTheme } from 'styled-components'
import ResponsiveCanvas, {
  deviceScaled,
} from '../../components/ResponsiveCanvas'

// normalized in range [-1, 1]
const normalized = byte => (byte - 128) / 128

class TimeGraph extends Component {
  render() {
    return <ResponsiveCanvas>{this.renderToCanvas}</ResponsiveCanvas>
  }

  renderToCanvas = canvas => {
    const { data, theme } = this.props
    const { width, height } = canvas
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = theme.info.background
    ctx.fillRect(0, 0, width, height)

    if (!data) return

    const bins = data.length / 2 ** 6
    const halfBins = bins / 2
    const zeroThreshold = 0.05
    let start = undefined
    for (let i = halfBins; i < data.length - halfBins; i++) {
      const value = data[i]
      const meetsThreshold = Math.abs(normalized(value)) < zeroThreshold
      if (meetsThreshold && data[i + 1] < value) {
        start = i - halfBins
        break
      }
    }

    if (!start) return

    const span = width / bins
    ctx.strokeStyle = theme.info.primary
    ctx.lineWidth = deviceScaled(1.5)
    ctx.beginPath()
    for (let i = start; i < start + bins; i++) {
      const value = normalized(data[i])
      const x = (i - start) * span
      const y = height * (1 / 2 + value / 3)
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()
  }
}

export default withTheme(TimeGraph)
