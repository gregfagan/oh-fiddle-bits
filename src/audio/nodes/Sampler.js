import React, { PureComponent } from 'react'
import { AudioContext } from '../signal'

export default class Sampler extends PureComponent {
  state = { node: null }

  componentDidMount() {
    const { sample } = this.props
    console.log(sample)

    const context = new AudioContext()
    const node = context.createMediaElementSource(sample)
    this.setState({ node })
  }

  render() {
    const {
      props: { children },
      state: { node },
    } = this
    // No visuals, passes node to children
    return React.Children.map(
      children,
      child => child && React.cloneElement(child, { source: node }),
    )
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    const { node } = this.state
    if (node) node.context.close()
  }
}
