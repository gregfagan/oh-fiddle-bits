import React from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import theme from './theme'

import Navigator from './components/Navigator'
import Tuner from './components/Tuner'
import ToneGenerator from './components/ToneGenerator'

const GlobalStyle = createGlobalStyle`
  ${props => props.theme.text.family.import}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  html,
  body,
  #root {
    overflow: hidden;
    height: 100%;
    width: 100vw;
    display: flex;
    flex-direction: column;
    background: ${props => props.theme.background};
  }

  body {
    font-family: ${props => props.theme.text.family.interface};
  }
`

const Header = styled.header`
  padding: 1em;
  background: ${props => props.theme.foreground};
  @media (max-height: 700px) {
    font-size: 0.7em;
    padding: 0.5em;
  }
`

const Title = styled.h1`
  font-family: ${props => props.theme.text.family.display};
  color: ${props => props.theme.text.color};
`

export default ({ extraOptions = [] }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
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
  </ThemeProvider>
)
