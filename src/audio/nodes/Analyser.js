import React, { PureComponent } from 'react'
import { normalize, rebase } from '../signal'

export default class Analyser extends PureComponent {
  static defaultProps = {
    fftSize: 2 ** 15,
    smoothing: 0.7,
    maxFrequency: 6000,
    onSample: null,
  }

  // This component uses mutable state so as not to be constantly
  // creating huge buffers. It doesn't render UI but copies data
  // to child props.
  node = null
  buffers = {
    time: [],
    frequency: {
      raw: [],
      normalized: [],
      rebased: [],
    },
  }
  windowSize = null
  rafId = null

  createNode() {
    const { source, fftSize, smoothing } = this.props
    if (!source) return

    const node = source.context.createAnalyser()

    node.fftSize = fftSize
    node.smoothingTimeConstant = smoothing
    source.connect(node)

    this.node = node
    this.createBuffers()

    this.sample()
  }

  createBuffers() {
    const {
      node,
      props: { fftSize, maxFrequency },
    } = this
    // we're not interested in the whole spectrum, just
    // everything up to the provided max
    const nyquistFrequency = node.context.sampleRate / 2
    const windowSize = nyquistFrequency / node.frequencyBinCount
    const freqBufferSize = Math.ceil(maxFrequency / windowSize)

    this.windowSize = windowSize
    this.buffers = {
      time: new Uint8Array(fftSize),
      frequency: {
        raw: new Float32Array(freqBufferSize),
        normalized: new Float32Array(freqBufferSize),
        rebased: new Float32Array(freqBufferSize),
      },
    }
  }

  componentDidMount() {
    this.createNode()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.source !== this.props.source) this.createNode()
  }

  componentWillUnmount() {
    const { rafId, node } = this
    if (node) node.disconnect()
    if (rafId) cancelAnimationFrame(rafId)
  }

  sample = () => {
    const { node, buffers, sample } = this

    node.getByteTimeDomainData(buffers.time)
    node.getFloatFrequencyData(buffers.frequency.raw)
    normalize(buffers.frequency.raw, buffers.frequency.normalized)
    rebase(buffers.frequency.raw, buffers.frequency.rebased)

    // Send updated data to children by rerendering
    this.forceUpdate()

    this.rafId = requestAnimationFrame(sample)
  }

  render() {
    const {
      props: { children },
      node,
      buffers: { time, frequency },
      windowSize,
    } = this
    const sampleRate = node && node.context.sampleRate
    return React.Children.map(
      children,
      child =>
        child &&
        React.cloneElement(child, { time, frequency, sampleRate, windowSize }),
    )
  }
}
