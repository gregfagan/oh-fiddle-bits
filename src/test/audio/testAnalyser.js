import { AudioContext, findFundamentalFrequency } from '../../audio/util'

export default function create() {
  const audioContext = new AudioContext()
  const oscillator = audioContext.createOscillator()
  const analyser = audioContext.createAnalyser()
  analyser.fftSize = 2048
  const buffer = new Uint8Array(analyser.fftSize)
  oscillator.start()
  oscillator.connect(analyser)
  audioContext.suspend()

  return {
    start: () => audioContext.resume(),
    stop: () => audioContext.suspend(),
    destroy: () => audioContext.close(),
    setFrequency: f => (oscillator.frequency.value = f),
    samplePitch: () => {
      analyser.getByteTimeDomainData(buffer)
      return findFundamentalFrequency(buffer, audioContext.sampleRate)
    },
  }
}
