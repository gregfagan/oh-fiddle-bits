import React from 'react'
import styled from 'styled-components'

import Navigator from './components/Navigator'
import Tuner from './components/Tuner'
import ToneGenerator from './components/ToneGenerator'

const Header = styled.header`
  padding: 1em;
`

const Title = styled.h1`
  font-weight: normal;
  font-size: 1.5em;
`

export default ({ extraOptions = [] }) => (
  <>
    <Header>
      <Title>oh fiddle bits!</Title>
    </Header>
    <Navigator>
      {[
        { name: 'tune', view: Tuner },
        { name: 'tone', view: ToneGenerator },
        { name: 'beat' },
      ].concat(extraOptions)}
    </Navigator>
  </>
)
