import { AudioContext } from '../signal'
import AudioSourceComponent from './AudioSourceComponent'

function createRecorder(stream, onComplete) {
  const recorder = new MediaRecorder(stream)
  const data = []
  recorder.ondataavailable = event => data.push(event.data)
  recorder.onstop = () => {
    const sample = new Blob(data, { type: 'audio/wav' })
    onComplete(sample)
  }
  recorder.start()
  return recorder
}

export default class Microphone extends AudioSourceComponent {
  static defaultProps = { onRecordSample: null }

  state = { node: null, stream: null, recorder: null }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(
      stream => {
        this.setState((state, props) => {
          const context = new AudioContext()
          const node = context.createMediaStreamSource(stream)
          const recorder = props.onRecordSample
            ? Microphone.createRecorder(stream, props.onRecordSample)
            : null

          return { node, stream, recorder }
        })
      },
      error => this.setState({ error }),
    )
  }

  componentDidUpdate() {
    const { onRecordSample } = this.props
    const { stream, recorder } = this.state

    if (recorder && !onRecordSample) {
      recorder.stop()
      this.setState({ recorder: null })
    } else if (!recorder && onRecordSample) {
      this.setState({
        recorder: createRecorder(stream, onRecordSample),
      })
    }
  }
}
