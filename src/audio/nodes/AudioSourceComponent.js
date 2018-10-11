import { PureComponent } from 'react'

export default class AudioSourceComponent extends PureComponent {
  state = { node: null, error: null }

  render() {
    const {
      props: { children: renderSource },
      state: { node, error },
    } = this
    // Emits no DOM, calls child as a render function with the source node
    return renderSource && renderSource(node, error)
  }

  destroy() {
    const { node } = this.state
    if (node) node.context.close()
  }

  componentWillUnmount() {
    this.destroy()
  }
}
