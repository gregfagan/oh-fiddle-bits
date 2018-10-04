import React, { PureComponent } from 'react'
import { AudioContext } from '../signal'

export default class Oscillator extends PureComponent {
  static defaultProps = { frequency: 440, type: 'triangle' }

  state = { node: null }

  componentDidMount() {
    this.setState((state, props) => {
      const context = new AudioContext()
      const node = context.createOscillator()
      node.frequency.value = props.frequency
      node.type = props.type
      node.start()
      return { node }
    })
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

  componentDidUpdate(prevProps) {
    const { frequency, type } = this.props
    const { node } = this.state

    if (!node) return
    if (prevProps.frequency !== frequency) node.frequency.value = frequency
    if (prevProps.type !== type) node.type = type
  }

  componentWillUnmount() {
    const { node } = this.state
    if (node) node.context.close()
  }
}
