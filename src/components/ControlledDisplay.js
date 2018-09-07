import React from 'react'
import styled from 'styled-components'
import Flex from './Flex'

const Container = styled(Flex)`
  display: grid;
  grid-template-rows: 50% 50%;
`

const Display = styled.figure`
  background: white;
`

const Controls = styled(Flex)`
  align-items: center;
  padding: 2em;
`

export default ({ display, controls }) => (
  <Container>
    <Display>{display}</Display>
    <Controls>{controls}</Controls>
  </Container>
)
