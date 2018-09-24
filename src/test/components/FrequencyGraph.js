import React, { Component } from 'react'
import { withTheme } from 'styled-components'
import ResponsiveCanvas from '../../components/ResponsiveCanvas'

class FrequencyGraph extends Component {
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

    const bins = data.length
    const span = width / bins
    ctx.fillStyle = theme.info.primary
    for (let i = 0; i < bins; i++) {
      const value = data[i]
      const barHeight = height * (value / 255)
      const x = i * span
      const y = height - barHeight
      ctx.fillRect(x, y, span, barHeight)
    }
  }
}

export default withTheme(FrequencyGraph)
