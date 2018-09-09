import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import Flex from './Flex'

function makeURI(name) {
  return encodeURI('#' + name.replace(' ', '-'))
}

const Container = styled(Flex)`
  flex-flow: ${props => (props.portrait ? 'column-reverse' : 'row')};
`

const Nav = styled(Flex.withComponent('nav'))`
  background: #111;
  flex: 0 0 auto;
  flex-flow: ${props => (props.portrait ? 'row' : 'column')};
  align-items: center;
`

const View = Flex.withComponent('main')

export const Option = styled.a.attrs({
  rel: 'internal',
  href: props => props.render && makeURI(props.children),
})`
  display: block;
  cursor: ${props => (props.render ? 'pointer' : 'default')};
  padding: ${props => (props.portrait ? '1em' : '1em 3em')};
  outline: none;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  color: ${props => (props.render ? 'white' : '#222')};
  background: ${props => props.selected && '#222'};
  flex-grow: ${props => (props.portrait ? 1 : 0)}
    ${props =>
      props.selected &&
      css`
      border-${props.portrait ? 'top' : 'right'}: 5px solid transparent;
      border-${props.portrait ? 'bottom' : 'left'}: 5px solid red;
    `};
`

function isPortrait() {
  return window.innerWidth < window.innerHeight
}

export class Navigator extends Component {
  state = {
    portrait: isPortrait(),
  }

  componentDidMount() {
    window.onhashchange = () => this.forceUpdate()
    window.onresize = () => this.orient()
  }

  orient() {
    const portrait = isPortrait()
    if (portrait !== this.state.portrait) this.setState({ portrait })
  }

  render() {
    const { portrait } = this.state
    const { children } = this.props

    const current = window.location.hash

    // The children of this component should be `Option`s. Iterate
    // over them, injecting calculated props for selection and
    // orientation. If the selected option is found and provides
    // a `render` prop, call it to generate the current view.
    let view
    const options = React.Children.toArray(children).map((child, i) => {
      const { children: name, render } = child.props
      // Check the URI form of the given option name against the current
      // window hash location. If there is no current hash location, the
      // first item defaults to selected.
      const selected = current ? current === makeURI(name) : i === 0

      // If this is the current view, render it
      if (selected && render) {
        view = render()
      }

      return React.cloneElement(child, { portrait, selected })
    })

    return (
      <Container portrait={portrait}>
        <Nav portrait={portrait}>{options}</Nav>
        <View>{view}</View>
      </Container>
    )
  }
}
