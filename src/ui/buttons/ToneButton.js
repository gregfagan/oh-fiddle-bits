import React, { Component } from 'react'
import { easeElastic } from 'd3-ease'

import IconButton from './IconButton'

const sinPath = amplitude => `
M -1 0
Q -0.5 ${amplitude} 0 0
T 1 0
`

const durationMS = 600

//
// Edge doesn't support SVG path animations, so this is a
// JavaScript animated icon.
//
class WaveForm extends Component {
  state = { lastToggle: -Infinity }
  rafId = null

  componentDidUpdate(prevProps) {
    if (this.props.on !== prevProps.on)
      this.setState({ lastToggle: performance.now() }, this.animate)
  }

  componentWillUnmount() {
    if (this.rafId) cancelAnimationFrame(this.rafId)
  }

  // Normalized animation time [0, 1]
  t() {
    return Math.min(1, (performance.now() - this.state.lastToggle) / durationMS)
  }

  // Rather than set state, just force rerender
  // until animation time met
  animate = () => {
    this.forceUpdate()
    if (this.t() < 1) {
      this.rafId = requestAnimationFrame(this.animate)
    }
  }

  render() {
    const t = easeElastic(this.t())
    const amplitude = 0.75 * (this.props.on ? t : 1 - t)
    return (
      <svg viewBox="-1.2 -1 2.4 2">
        <path
          d={sinPath(amplitude)}
          strokeWidth="0.15"
          strokeLinecap="round"
          stroke="var(--color)"
          fill="none"
        />
      </svg>
    )
  }
}

export default ({ on, ...props }) => (
  <IconButton on={on} {...props}>
    <WaveForm on={on} />
  </IconButton>
)
