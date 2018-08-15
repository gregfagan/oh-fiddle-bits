let audioContext
let oscillator

function init() {
  audioContext = new window.AudioContext()
  oscillator = audioContext.createOscillator()
  oscillator.start()
}

function setFrequency(f) {
  oscillator.frequency.value = f
}

function start(frequency) {
  oscillator.connect(audioContext.destination)
}

function stop() {
  oscillator.disconnect(audioContext.destination)
}

export default {
  init,
  setFrequency,
  start,
  stop
}
