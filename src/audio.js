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

function start() {
  oscillator.connect(audioContext.destination)
}

function stop() {
  oscillator.disconnect(audioContext.destination)
}

const toneGenerator = {
  init,
  setFrequency,
  start,
  stop,
}

export default toneGenerator

const log2 = Math.log(2)
export function deltaCents(f1, f2) {
  return Math.floor(1200 * (Math.log(f1 / f2) / log2))
}

export const semitoneNames = (() => {
  const chromatic = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ]
  const semitones = []
  for (let i = 0; i <= 8; i++) {
    for (let name of chromatic) {
      semitones.push(name + i)
    }
  }

  return semitones
})()
