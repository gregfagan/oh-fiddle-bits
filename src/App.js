import React, { Component } from 'react'
import styled from 'styled-components'

import { Navigator, Option } from './components/Navigator'
import Tuner from './components/Tuner'
import ToneGenerator from './components/ToneGenerator'

const Header = styled.header`
  padding: 1em;
`

const Title = styled.h1`
  font-weight: normal;
  font-size: 1.5em;
`

export default () => (
  <>
    <Header>
      <Title>oh fiddle bits!</Title>
    </Header>
    <Navigator>
      <Option render={() => <Tuner />}>tune</Option>
      <Option render={() => <ToneGenerator />}>tone</Option>
      <Option>beat</Option>
    </Navigator>
  </>
)
