import React from 'react'
import styled from 'styled-components'
import Flex from './Flex'

const Container = styled(Flex)`
  display: grid;
  grid-template-rows: 50% 50%;
`

const Display = styled(Flex)`
  position: relative;
  background: ${props => props.theme.info.background};
`

const Shadow = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  @media (orientation: portrait) {
    box-shadow: inset 0 -5px 18px -4px rgba(0, 0, 0, 0.3),
      inset 0 5px 18px -4px rgba(0, 0, 0, 0.3);
  }

  @media (orientation: landscape) {
    box-shadow: inset 0 0 18px 3px rgba(0, 0, 0, 0.3);
  }
`

const Controls = styled(Flex)`
  align-items: center;
  padding: 5vh;
`

export default ({ display, controls }) => (
  <Container>
    <Display as="figure">
      <Shadow />
      {display}
    </Display>
    <Controls>{controls}</Controls>
  </Container>
)
