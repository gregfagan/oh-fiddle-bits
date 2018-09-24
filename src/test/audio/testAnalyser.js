import {
  AudioContext,
  findFundamentalFrequency,
  indexOfMax,
  parabolicInterpolateMax,
  normalize,
  harmonicSpectrum,
  product,
  sum,
} from '../../audio/signal'

export default async function create(
  fftSize = 2048,
  maxFrequency = 4000,
  useMicrophone = false,
  onFinishedRecording = null,
) {
  const audioContext = new AudioContext()
  const analyser = audioContext.createAnalyser()
  analyser.fftSize = fftSize
  analyser.smoothingTimeConstant = 0.5
  analyser.maxDecibels = -15
  const timeBuffer = new Uint8Array(analyser.fftSize)
  const nyquistFrequency = audioContext.sampleRate / 2
  const windowSize = nyquistFrequency / analyser.frequencyBinCount

  // we're not interested in the whole spectrum, just
  // everything up to the provided max
  const freqBufferSize = Math.ceil(maxFrequency / windowSize)
  const freqByteBuffer = new Uint8Array(freqBufferSize)
  const freqFloatBuffer = new Float32Array(freqBufferSize)

  let oscillator
  let microphone

  if (useMicrophone) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    microphone = audioContext.createMediaStreamSource(stream)
    microphone.connect(analyser)

    if (onFinishedRecording) {
      const recorder = new MediaRecorder(stream)
      const recorderData = []
      recorder.start()
      recorder.ondataavailable = event => recorderData.push(event.data)
      recorder.onstop = () => {
        const recording = new Blob(recorderData, {
          type: 'audio/wav',
        })
        onFinishedRecording(recording)
      }
    }
  } else {
    oscillator = new OscillatorNode(audioContext, { type: 'triangle' })
    oscillator.start()
    oscillator.connect(analyser)
    audioContext.suspend()
  }

  return {
    start: () => audioContext.resume(),
    stop: () => audioContext.suspend(),
    destroy: () => {
      audioContext.close()
    },
    setFrequency: f => (oscillator.frequency.value = f),
    getBuffers: () => ({ time: timeBuffer, frequency: freqByteBuffer }),
    sample: () => {
      analyser.getByteTimeDomainData(timeBuffer)
      analyser.getByteFrequencyData(freqByteBuffer)
      analyser.getFloatFrequencyData(freqFloatBuffer)
    },
    getAutoFreq: () =>
      findFundamentalFrequency(timeBuffer, audioContext.sampleRate),
    getInterpolatedFreq: () => {
      const max = indexOfMax(freqByteBuffer)
      const interpolated = parabolicInterpolateMax(max, freqByteBuffer)
      return interpolated * windowSize
    },
    getFreq: () => {
      const max = indexOfMax(freqFloatBuffer)
      return max * windowSize
    },
    getHarmonicProduct: () => {
      const normalized = normalize(freqFloatBuffer)
      if (!normalized) return
      const hps = harmonicSpectrum(normalized, 2, product)
      const max = indexOfMax(hps)
      const interpolated = parabolicInterpolateMax(max, normalized)
      return interpolated * windowSize
    },
    getHarmonicSum: () => {
      const normalized = normalize(freqFloatBuffer)
      if (!normalized) return
      const hss = harmonicSpectrum(normalized, 3, sum)
      const max = indexOfMax(hss)
      const interpolated = parabolicInterpolateMax(max, normalized)
      return interpolated * windowSize
    },
  }
}
