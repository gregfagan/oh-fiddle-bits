import { AudioContext, findFundamentalFrequency } from './signal'

export default async function create() {
  const audioContext = new AudioContext()
  const analyser = audioContext.createAnalyser()
  analyser.fftSize = 2048
  const buffer = new Uint8Array(analyser.fftSize)
  audioContext.suspend()

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const microphone = audioContext.createMediaStreamSource(stream)
  microphone.connect(analyser)

  return {
    start: () => audioContext.resume(),
    stop: () => audioContext.suspend(),
    destroy: () => audioContext.close(),
    samplePitch: () => {
      analyser.getByteTimeDomainData(buffer)
      return findFundamentalFrequency(buffer, audioContext.sampleRate)
    },
  }
}
