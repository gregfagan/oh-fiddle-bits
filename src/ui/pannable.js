import React, { Component } from 'react'
import styled from 'styled-components'

//
// A higher order component that accepts callbacks for pan events
//

const position = ({ clientX: x, clientY: y }) => ({ x, y })

export default function pannable(WrappedComponent) {
  const TouchableComponent = styled(WrappedComponent).attrs({
    'touch-action': 'none', // required for pointer events polyfill
  })`
    touch-action: none;
    cursor: ${props => (props.isPanning ? 'grabbing' : 'grab')};
  `

  return class Pannable extends Component {
    static displayName = `Pannable${WrappedComponent.displayName ||
      WrappedComponent.name}`

    state = {
      panStart: null,
      panLast: null,
    }

    render() {
      const { onPanStart, onPan, onPanEnd, ...rest } = this.props
      return (
        <TouchableComponent
          onPointerDown={this.startPanning}
          onPointerMove={this.pan}
          onPointerUp={this.stopPanning}
          onPointerCancel={this.stopPanning}
          onPointerOut={this.stopPanning}
          isPanning={Boolean(this.state.panStart)}
          {...rest}
        />
      )
    }

    startPanning = e => {
      const { onPanStart } = this.props

      if (onPanStart) {
        onPanStart()
      }

      this.setState({ panStart: position(e) })
    }

    pan = e => {
      const {
        props: { onPan },
        state: { panStart, panLast },
      } = this

      const current = position(e)
      if (panStart && onPan) {
        const last = panLast || panStart
        const delta = {
          x: current.x - last.x,
          y: current.y - last.y,
        }
        onPan(delta)
      }

      this.setState({ panLast: current })
    }

    stopPanning = e => {
      const {
        props: { onPanEnd },
        state: { panStart },
      } = this

      if (panStart && onPanEnd) {
        const current = position(e)
        const total = {
          x: current.x - panStart.x,
          y: current.y - panStart.y,
        }
        onPanEnd(total)
      }

      this.setState({ panStart: null, panLast: null })
    }
  }
}
