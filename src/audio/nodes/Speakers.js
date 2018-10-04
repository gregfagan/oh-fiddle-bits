import { PureComponent } from 'react'

export default class Speakers extends PureComponent {
  componentDidMount() {
    const { source } = this.props
    source.connect(source.context.destination)
  }

  componentDidUpdate(prevProps) {
    const { source } = this.props
    if (prevProps.source !== source) {
      prevProps.source.disconnect(prevProps.source.context.destination)
      source.connect(source.context.destination)
    }
  }

  componentWillUnmount() {
    const { source } = this.props
    source.disconnect(source.context.destination)
  }

  render() {
    return null
  }
}
