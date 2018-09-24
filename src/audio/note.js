const log2 = Math.log(2)

// An array note names based on commonly used
// https://en.wikipedia.org/wiki/Scientific_pitch_notation
export const notes = (() => {
  const chromatic = [
    'C',
    'C♯',
    'D',
    'D♯',
    'E',
    'F',
    'F♯',
    'G',
    'G♯',
    'A',
    'A♯',
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

export const centerNote = notes.indexOf('A4')
export const centerFrequency = 440

export function nearestNote(f) {
  const centsFromCenter = deltaCents(f, centerFrequency)
  const semitonesFromCenter = Math.round(centsFromCenter / 100)
  const note = centerNote + semitonesFromCenter
  return note
}

export function frequencyOfNote(note) {
  const semitonesFromCenter = note - centerNote
  const centsFromCenter = semitonesFromCenter * 100
  return addCents(centerFrequency, centsFromCenter)
}

// Returns the difference between frequencies f1 and f2 in cents
// https://en.wikipedia.org/wiki/Cent_(music)
export function deltaCents(f1, f2) {
  return Math.floor(1200 * (Math.log(f1 / f2) / log2))
}

// Returns the frequency f shifted by the given number of cents
export function addCents(f, cents) {
  return f * Math.pow(2, cents / 1200)
}
