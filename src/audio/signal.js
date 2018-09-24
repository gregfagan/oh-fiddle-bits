export const AudioContext = window.AudioContext || window.webkitAudioContext

// Adapted from https://developer.microsoft.com/en-us/microsoft-edge/testdrive/demos/webaudiotuner/
// Use autocorrelation to find fundamental frequency of audio signal
const normalizeByte = byte => (byte - 128) / 128
export function findFundamentalFrequency(buffer, sampleRate) {
  const minK = Math.round(sampleRate / 4186) // C8
  const maxK = Math.round(sampleRate / 123.5) // B2
  const n = buffer.length - maxK // correlate the whole buffer

  let bestK = -1
  let bestR = 0

  for (let k = minK; k <= maxK; k++) {
    let sum = 0
    for (let i = 0; i < n; i++) {
      sum += normalizeByte(buffer[i]) * normalizeByte(buffer[i + k])
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
    return undefined
  }
}

export function normalize(data) {
  const { min, max } = data.reduce(
    (prev, current) => {
      return {
        min: current < prev.min ? current : prev.min,
        max: current > prev.max ? current : prev.max,
      }
    },
    {
      min: Infinity,
      max: -Infinity,
    },
  )
  if (min === max) return undefined
  return data.map(current => (min - current) / (min - max))
}

// function average(data, cutoff) {
//   const { min, max } = data.reduce(
//     (prev, current) => {
//       return {
//         min: current < prev.min ? current : prev.min,
//         max: current > prev.max ? current : prev.max,
//       }
//     },
//     {
//       min: Infinity,
//       max: -Infinity,
//     },
//   )
//   if (min === max) return undefined
//   const normalize = current => {
//     const n = (min - current) / (min - max)
//     return n < cutoff ? 0 : n
//   }
//   const total = data.reduce((prev, current) => prev + normalize(current), 0)
//   return data.reduce((prev, current, i) => {
//     const freq = i
//     const ratio = normalize(current) / total
//     return prev + freq * ratio
//   }, 0)
// }

// function findMaxSpan(data) {
//   const max = { start: -1, end: -1, value: -Infinity }
//   for (let i = 0; i < data.length; ++i) {
//     if (data[i] > max.value) {
//       max.start = i
//       max.end = i
//       max.value = data[i]
//     } else if (max.start >= 0 && max.value > 0 && data[i] === max.value) {
//       max.end = i
//     }
//   }

//   // console.log(`final max ${max.value} from ${max.start} to ${max.end}`)
//   return max
// }

export function indexOfMax(data) {
  return data.reduce(
    (prevIndex, currentValue, index) =>
      currentValue > data[prevIndex] ? index : prevIndex,
    0,
  )
}

//
// Given a sampled function `values` with a local max at `index`, uses
// quadratic interpolation to compute the fractional position between
// samples of the estimated true peak.
//
// see http://fourier.eng.hmc.edu/e176/lectures/NM/node25.html
//
export function parabolicInterpolateMax(index, values) {
  const prevIndex = index - 1
  const nextIndex = index + 1

  // Make sure surrounding points are still in bounds
  const outOfBounds = prevIndex < 0 || nextIndex >= values.length
  if (outOfBounds) return index

  const prevValue = values[prevIndex]
  const value = values[index]
  const nextValue = values[nextIndex]

  // The value at the given index must be a local maximum
  const notLocalMax = prevValue >= value || nextValue >= value
  if (notLocalMax) return index

  const max =
    index +
    0.5 * (nextValue - value) * (prevIndex - index) ** 2 -
    ((prevValue - value) * (index - nextIndex) ** 2) /
      ((nextValue - value) * (prevIndex - index) +
        (prevValue - value) * (index - nextIndex))

  return max
}

export const sum = (a, b) => a + b
export const product = (a, b) => a * b

export function harmonicSpectrum(data, numHarmonics, operation = sum) {
  const result = [...data]

  for (let i = 2; i <= numHarmonics; i++) {
    const downsampled = downsample(data, i)
    for (let j = 0; j < downsampled.length; j++) {
      result[j] = operation(result[j], downsampled[j])
    }
  }

  return result
}

function downsample(data, ratio) {
  const result = new Array(Math.floor(data.length / ratio))
  for (let i = 0; i < result.length; i++) {
    result[i] = data[i * ratio]
  }
  return result
}
