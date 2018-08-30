export const AudioContext = window.AudioContext || window.webkitAudioContext

const log2 = Math.log(2)

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

// Returns the difference between frequencies f1 and f2 in cents
// https://en.wikipedia.org/wiki/Cent_(music)
export function deltaCents(f1, f2) {
  return Math.floor(1200 * (Math.log(f1 / f2) / log2))
}

// Returns the frequency f shifted by the given number of cents
export function addCents(f, cents) {
  return f * Math.pow(2, cents / 1200)
}

// Adapted from https://developer.microsoft.com/en-us/microsoft-edge/testdrive/demos/webaudiotuner/
// Use autocorrelation to find fundamental frequency of audio signal
// TODO: understand, tweak, experiment
export function findFundamentalFrequency(buffer, sampleRate) {
  const n = 1024
  // const n = 2048
  let bestK = -1
  let bestR = 0

  for (let k = 8; k <= 1000; k++) {
    let sum = 0
    for (let i = 0; i < n; i++) {
      sum += ((buffer[i] - 128) / 128) * ((buffer[i + k] - 128) / 128)
    }

    const r = sum / (n + k)
    if (r > bestR) {
      bestR = r
      bestK = k
    }

    if (r > 0.9) {
      // Let's assume that this is good enough and stop right here
      break
    }
  }

  if (bestR > 0.0025) {
    // The period (in frames) of the fundamental frequency is 'bestK'. Getting the frequency from there is trivial.
    const fundamentalFreq = sampleRate / bestK
    return fundamentalFreq
  } else {
    // We haven't found a good correlation
    return -1
  }
}
