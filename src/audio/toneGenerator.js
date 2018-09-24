import { AudioContext } from './signal'

export default function create() {
  const audioContext = new AudioContext()
  const oscillator = audioContext.createOscillator()
  oscillator.start()
  oscillator.connect(audioContext.destination)
  audioContext.suspend()

  return {
    setFrequency: f => (oscillator.frequency.value = f),
    start: () => audioContext.resume(),
    stop: () => audioContext.suspend(),
    destroy: () => audioContext.close(),
  }
}
