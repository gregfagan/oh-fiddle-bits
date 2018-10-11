import { AudioContext } from '../signal'
import AudioSourceComponent from './AudioSourceComponent'

export default class Sampler extends AudioSourceComponent {
  componentDidMount() {
    this.createSampleSource()
  }

  componentDidUpdate(prevProps) {
    const { sample } = this.props
    if (prevProps.sample !== sample) {
      this.createSampleSource()
    }
  }

  createSampleSource() {
    const { sample } = this.props
    if (!sample) return

    this.destroy()

    const context = new AudioContext()
    const reader = new FileReader()
    reader.onloadend = () => {
      context.decodeAudioData(reader.result, buffer => {
        const node = context.createBufferSource()
        node.buffer = buffer
        node.loop = true
        node.start()
        this.setState({ node })
      })
    }
    reader.readAsArrayBuffer(sample)
  }
}
