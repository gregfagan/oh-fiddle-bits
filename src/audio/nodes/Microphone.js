import React, { PureComponent } from 'react'
import { AudioContext } from '../signal'

export default class Microphone extends PureComponent {
  static defaultProps = { onRecordSample: null }

  state = { node: null, stream: null, recorder: null }

  static createRecorder(stream, onComplete) {
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

  componentDidUpdate() {
    const { onRecordSample } = this.props
    const { stream, recorder } = this.state

    if (recorder && !onRecordSample) {
      console.log('stopped recording')
      recorder.stop()
      this.setState({ recorder: null })
    } else if (!recorder && onRecordSample) {
      console.log('started recording')
      this.setState({
        recorder: Microphone.createRecorder(stream, onRecordSample),
      })
    }
  }

  componentWillUnmount() {
    const { node } = this.state
    if (node) node.context.close()
  }
}
