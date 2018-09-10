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
  `

  return class Pannable extends Component {
    static displayName = `Pannable${WrappedComponent.displayName ||
      WrappedComponent.name}`

    panStart = null
    panLast = null

    render() {
      const { onPanStart, onPan, onPanEnd, ...rest } = this.props
      return (
        <TouchableComponent
          onPointerDown={this.startPanning}
          onPointerMove={this.pan}
          onPointerUp={this.stopPanning}
          onPointerCancel={this.stopPanning}
          onPointerOut={this.stopPanning}
          {...rest}
        />
      )
    }

    startPanning = e => {
      const { onPanStart } = this.props

      if (onPanStart) {
        onPanStart()
      }

      this.panStart = position(e)
    }

    pan = e => {
      const {
        panStart,
        panLast,
        props: { onPan },
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

      this.panLast = current
    }

    stopPanning = e => {
      const {
        panStart,
        props: { onPanEnd },
      } = this

      if (panStart && onPanEnd) {
        const current = position(e)
        const total = {
          x: current.x - panStart.x,
          y: current.y - panStart.y,
        }
        onPanEnd(total)
      }

      this.panStart = null
      this.panLast = null
    }
  }
}
