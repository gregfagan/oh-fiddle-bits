import { AudioContext } from '../signal'
import AudioSourceComponent from './AudioSourceComponent'

function createRecorder(stream, onComplete) {
  const startRecording = recorder => {
    const data = []
    recorder.addEventListener('dataavailable', event => data.push(event.data))
    recorder.addEventListener('stop', () => {
      const sample = new Blob(data, { type: 'audio/wav' })
      onComplete(sample)
    })
    recorder.start()
    return Promise.resolve(recorder)
  }

  return Promise.resolve(
    window.MediaRecorder
      ? undefined
      : import('audio-recorder-polyfill').then(polyfill => {
          console.log('loaded MediaRecorder polyfill')
          window.MediaRecorder = polyfill.default
        }),
  ).then(() => startRecording(new MediaRecorder(stream)))
}

export default class Microphone extends AudioSourceComponent {
  static defaultProps = { onRecordSample: null }

  state = { node: null, stream: null, recorderPromise: null }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(
      stream => {
        this.setState((state, props) => {
          const context = new AudioContext()
          const node = context.createMediaStreamSource(stream)
          return { node, stream }
        }, this.toggleRecorder)
      },
      error => this.setState({ error }),
    )
  }

  componentDidUpdate(prevProps) {
    if (this.props.onRecordSample !== prevProps.onRecordSample)
      this.toggleRecorder()
  }

  toggleRecorder = () => {
    const { onRecordSample } = this.props
    const { stream, recorderPromise } = this.state

    if (recorderPromise && !onRecordSample) {
      recorderPromise
        .then(recorder => recorder.stop())
        .then(this.setState({ recorderPromise: null }))
    } else if (!recorderPromise && onRecordSample) {
      this.setState({
        recorderPromise: createRecorder(stream, onRecordSample).catch(error =>
          console.error(error),
        ),
      })
    }
  }
}
