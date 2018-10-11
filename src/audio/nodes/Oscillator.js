import { AudioContext } from '../signal'
import AudioSourceComponent from './AudioSourceComponent'

export default class Oscillator extends AudioSourceComponent {
  static defaultProps = { frequency: 440, type: 'triangle' }

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

  componentDidUpdate(prevProps) {
    const { frequency, type } = this.props
    const { node } = this.state

    if (!node) return
    if (prevProps.frequency !== frequency) node.frequency.value = frequency
    if (prevProps.type !== type) node.type = type
  }
}
