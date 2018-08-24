import React, { Component } from 'react'
import styled from 'styled-components'

import { Navigator, Option } from './components/Navigator'
import Tuner from './components/Tuner'
import ToneGenerator from './components/ToneGenerator'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #222;
  color: #eee;
`

const Header = styled.header`
  padding: 1em;
`

const Title = styled.h1`
  font-weight: normal;
  font-size: 1.5em;
`

class App extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Title>oh fiddle bits!</Title>
        </Header>
        <Navigator>
          <Option render={() => <Tuner />}>tune</Option>
          <Option render={() => <ToneGenerator />}>tone</Option>
          <Option>beat</Option>
        </Navigator>
      </Container>
    )
  }
}

export default App
