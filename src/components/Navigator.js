import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import Flex from './Flex'

function makeURI(name) {
  return encodeURI('#' + name.replace(' ', '-'))
}

const Container = styled(Flex)`
  flex-flow: row;
  @media (orientation: portrait) {
    flex-flow: column-reverse;
  }
`

const Nav = styled(Flex)`
  background: ${props => props.theme.background};
  flex: 0 0 auto;

  @media (orientation: landscape) {
    flex-flow: column;
    box-shadow: inset -8px 0 8px -5px rgba(0, 0, 0, 0.2);
  }

  @media (orientation: portrait) {
    flex-flow: row;
    box-shadow: inset 0 8px 8px -5px rgba(0, 0, 0, 0.2);
  }
`

const View = styled(Flex)`
  background: ${props => props.theme.foreground};
  @media (orientation: landscape) {
    padding: 0em 1.5em;
  }
`

const selectedAccentSize = '7px'
const selectedOption = css`
  color: ${props => props.theme.active};
  background: ${props => props.theme.foreground};

  @media (orientation: portrait) {
    border-top: 0px solid transparent;
    border-bottom: ${selectedAccentSize} solid
      ${props => props.theme.shades.accent};
  }

  @media (orientation: landscape) {
    border-right: 0px solid transparent;
    border-left: ${selectedAccentSize} solid
      ${props => props.theme.shades.accent};
  }
`

const unselectedOption = css`
  @media (orientation: portrait) {
    border-top: ${selectedAccentSize} solid transparent;
    border-bottom: 0px;
  }

  @media (orientation: landscape) {
    border-right: ${selectedAccentSize} solid transparent;
    border-left: 0px;
  }
`

const disabledOption = css`
  cursor: default;
  color: ${props => props.theme.disabled};
`

const Option = styled.a.attrs({
  rel: 'internal',
  href: ({ disabled, children: name }) =>
    !disabled ? makeURI(name) : undefined,
})`
  display: block;
  outline: none;
  padding: 1em 3.25em;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
  color: ${props => props.theme.inactive};
  transition: border 0.15s;
  ${props => (props.selected ? selectedOption : unselectedOption)};
  ${props => props.disabled && disabledOption};

  @media (orientation: portrait) {
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
        <Nav as="nav">{renderedOptions}</Nav>
        <View as="main">{renderedView}</View>
      </Container>
    )
  }
}
