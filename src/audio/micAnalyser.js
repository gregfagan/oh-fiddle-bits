import { AudioContext, findFundamentalFrequency } from './util'

export default function create() {
  const audioContext = new AudioContext()
  const analyser = audioContext.createAnalyser()
  analyser.fftSize = 2048
  const buffer = new Uint8Array(analyser.fftSize)
  audioContext.suspend()

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(stream => {
      const microphone = audioContext.createMediaStreamSource(stream)
      microphone.connect(analyser)
    })
    .catch(err => console.log('Could not get microphone stream', err))

  return {
    start: () => audioContext.resume(),
    stop: () => audioContext.suspend(),
    samplePitch: () => {
      analyser.getByteTimeDomainData(buffer)
      return findFundamentalFrequency(buffer, audioContext.sampleRate)
    },
  }
}
