export { default as createToneGenerator } from './toneGenerator'

const log2 = Math.log(2)

// Returns the difference between frequencies f1 and f2 in cents
// https://en.wikipedia.org/wiki/Cent_(music)
export function deltaCents(f1, f2) {
  return Math.floor(1200 * (Math.log(f1 / f2) / log2))
}

// Returns the frequency f shifted by the given number of cents
export function addCents(f, cents) {
  return f * Math.pow(2, cents / 1200)
}

// An array note names based on commonly used
// https://en.wikipedia.org/wiki/Scientific_pitch_notation
export const notes = (() => {
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
  const names = []
  for (let i = 0; i <= 8; i++) {
    for (let name of chromatic) {
      names.push(name + i)
    }
  }

  return names
})()
