import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Display = styled.div`
  flex: 1 1 0;
  min-height: 0;
`

const Controls = styled.div`
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default ({ display, controls }) => (
  <Container>
    <Display>{display}</Display>
    <Controls>{controls}</Controls>
  </Container>
)

export const Button = styled.button`
  background: transparent;
  color: #eee;
  border: 2px solid #eee;
  padding: 10px;
  margin-right: 20px;
  font-weight: bold;
  text-transform: uppercase;
`
