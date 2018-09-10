import React, { Component } from 'react'
import styled from 'styled-components'
import { withContentRect } from 'react-measure'

//
// A <canvas> that responsively fills its container
// and automatically adjusts for hi-dpi screens.
//
// Pass it a render function as a child which
// accepts the canvas element as its argument.
//

const Canvas = styled.canvas.attrs({
  // styled-components will filter this attribute unless
  // it is explicity passed here. See pannable.js
  'touch-action': props => props['touch-action'],
})`
  display: block;
  width: 100%;
  height: 100%;
`

class ResponsiveCanvas extends Component {
  canvasEl = null

  setCanvasRef = element => {
    this.canvasEl = element
    this.props.measureRef(element)
  }

  render() {
    const { canvasEl, setCanvasRef, props } = this
    const {
      children: renderToCanvas,
      contentRect: { bounds: cssBounds },
      measure,
      measureRef,
      ...rest
    } = props

    if (canvasEl) {
      // To support hi-dpi screens, directly set the width and height
      // of the canvas element to bounds scaled by the devicePixelRatio.
      // The canvas CSS rules keep it fit to its container, but the
      // canvas' internal dimensions may be larger.
      const { width, height } = deviceScaledBounds(cssBounds)
      canvasEl.width = width
      canvasEl.height = height

      if (renderToCanvas) {
        renderToCanvas(canvasEl)
      }
    }

    return <Canvas ref={setCanvasRef} {...rest} />
  }
}

export default withContentRect('bounds')(ResponsiveCanvas)

export function deviceScaled(x) {
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
