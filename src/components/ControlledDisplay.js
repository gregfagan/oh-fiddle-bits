import React from 'react'
import styled from 'styled-components'
import Flex from './Flex'

const Container = styled(Flex)`
  display: grid;
  grid-template-rows: 50% 50%;
`

const Controls = styled(Flex)`
  align-items: center;
  padding: 2em;
`

export default ({ display, controls }) => (
  <Container>
    <figure>{display}</figure>
    <Controls>{controls}</Controls>
  </Container>
)
