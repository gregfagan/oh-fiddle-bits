import React from 'react'
import windowSize from 'react-window-size'

const heightFactor = 0.25 // percent of window height
const needleWidth = 10 // pixels
const needleHeightFactor = 0.4 // percent of slider height
const textMargin = 10
const textHeightFactor = 0.25

function FrequencySlider(props) {
  const { frequency, windowWidth, windowHeight } = props
  const height = heightFactor * windowHeight

  return (
    <svg height={height} width={windowWidth}>
      <rect fill="white" width="100%" height="100%" />
      <Needle containerWidth={windowWidth} containerHeight={height} />
      <text
        x={textMargin}
        y={height - textMargin}
        style={{ font: `bold ${height * textHeightFactor}px sans-serif` }}
      >
        {frequency}
      </text>
    </svg>
  )
}

function Needle({ containerWidth, containerHeight }) {
  const needleHeight = containerHeight * needleHeightFactor
  return (
    <rect
      fill="#FF530D"
      opacity="50%"
      width={needleWidth}
      height={needleHeight}
      x={(containerWidth - needleWidth) * 0.5}
      y={containerHeight - needleHeight}
    />
  )
}

export default windowSize(FrequencySlider)
