let audioContext
let oscillator

function init() {
  audioContext = new window.AudioContext()
  oscillator = audioContext.createOscillator()
  oscillator.frequency.value = 440
  oscillator.start()
}

function start() {
  oscillator.connect(audioContext.destination)
}

function stop() {
  oscillator.disconnect(audioContext.destination)
}

export default {
  init,
  start,
  stop
}
