import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import Flex from './Flex'

function makeURI(name) {
  return encodeURI('#' + name.replace(' ', '-'))
}

const Container = styled(Flex)`
  flex-flow: row;
  @media screen and (orientation: portrait) {
    flex-flow: column-reverse;
  }
`

const Nav = styled(Flex.withComponent('nav'))(css`
  background: #111;
  flex: 0 0 auto;
  flex-flow: column;
  align-items: center;
  @media screen and (orientation: portrait) {
    flex-flow: row;
  }
`)

const View = Flex.withComponent('main')

const selectedOption = css`
  background: #222;

  @media screen and (orientation: portrait) {
    border-top: 5px solid transparent;
    border-bottom: 5px solid red;
  }

  @media screen and (orientation: landscape) {
    border-right: 5px solid transparent;
    border-left: 5px solid red;
  }
`

const disabledOption = css`
  cursor: default;
  color: #222;
`

const Option = styled.a.attrs({
  rel: 'internal',
  href: ({ disabled, children: name }) =>
    !disabled ? makeURI(name) : undefined,
})`
  display: block;
  outline: none;
  padding: 1em 3em;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  color: white;
  ${props => props.selected && selectedOption};
  ${props => props.disabled && disabledOption};

  @media screen and (orientation: portrait) {
    flex-grow: 1;
    padding: 1em;
  }
`

export default class Navigator extends Component {
  // This component routes based on the location hash. The
  // current value is read during render, so we don't need
  // to set any state; just force an update when it changes.
  componentDidMount() {
    window.onhashchange = () => this.forceUpdate()
  }

  render() {
    const { children: options } = this.props
    const selectedURI = window.location.hash

    // While rendering the Options, keep a reference
    // to the selected view to be rendered below.
    let selectedView
    const renderedOptions = options.map(({ name, view }, i) => {
      // If there is no selectedURI, default to the first option
      const selected = selectedURI ? selectedURI === makeURI(name) : i === 0

      if (selected) selectedView = view

      return (
        <Option key={name} selected={selected} disabled={!view}>
          {name}
        </Option>
      )
    })

    const renderedView = selectedView && React.createElement(selectedView)

    return (
      <Container>
        <Nav>{renderedOptions}</Nav>
        <View>{renderedView}</View>
      </Container>
    )
  }
}
