import React from 'react'
import styled from 'styled-components'
import Flex from './Flex'

const Display = Flex.withComponent('figure')
const Controls = styled(Flex)`
  align-items: center;
  padding: 2em;
`

export default ({ display, controls }) => (
  <>
    <Display>{display}</Display>
    <Controls>{controls}</Controls>
  </>
)

export const Button = styled.button`
  background: orange;
  border: none;
  padding: 10px;
  cursor: pointer;
`
