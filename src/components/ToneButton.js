import React from 'react'
import styled from 'styled-components'

const TWO_PI = Math.PI * 2
const sinPath = amplitude => `
M ${-TWO_PI} 0
Q ${-Math.PI * 1.5} ${amplitude} ${-Math.PI} 0
T 0 0
T ${Math.PI} 0
T ${TWO_PI} 0
`

const Graphic = styled.svg`
  height: 100%;
  stroke: ${({ on }) => (on ? 'white' : 'black')};
  fill: transparent;
  stroke-width: 0.6;
`

const WaveForm = styled.path.attrs({
  d: sinPath(3),
})`
  transition: 0.15s transform, 0.05s stroke-width;
  transform: ${({ on }) => (on ? 'scale(1, 1)' : 'scale(100, 1)')};
  stroke-width: ${({ on }) => (on ? 0.75 : 0.45)};
`

export default ({ on, frequency, ...props }) => (
  <Graphic viewBox="0 0 10 10" on={on} frequency={frequency} {...props}>
    <circle cx="5" cy="5" r="4.5" />
    <svg
      x={0.7}
      y={1}
      width={8.6}
      height={8}
      viewBox={`${-1.9 * Math.PI} -1 ${3.8 * Math.PI} 2`}
    >
      <WaveForm on={on} frequency={frequency} />
    </svg>
  </Graphic>
)
