import React from 'react'
import styled from 'styled-components'

const Graphic = styled.svg`
  height: 100%;
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  --color: ${props => (props.on ? props.theme.active : props.theme.inactive)};
  * {
    pointer-events: none;
  }
`

export default function IconButton({ children, ...rest }) {
  return (
    <Graphic {...rest} viewBox="0 0 1 1" role="button">
      <circle
        cx="50%"
        cy="50%"
        r="47.5%"
        strokeWidth="5%"
        fill="none"
        stroke="var(--color)"
      />
      <svg x="10%" y="10%" width="80%" height="80%">
        {children}
      </svg>
    </Graphic>
  )
}
