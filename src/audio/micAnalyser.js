let audioContext
let microphone
let analyzer
let pitchDetectCallback

function init() {
  audioContext = new window.AudioContext()

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(stream => {
      microphone = audioContext.createMediaStreamSource(stream)

      analyzer = audioContext.createAnalyser()
      analyzer.fftSize = 2048

      microphone.connect(analyzer)

      detectPitch()
    })
    .catch(err => console.log('Could not get microphone stream', err))
}

export function onPitch(fn) {
  pitchDetectCallback = fn
}

// Adapted from https://developer.microsoft.com/en-us/microsoft-edge/testdrive/demos/webaudiotuner/
// Use autocorrelation to find fundamental frequency of audio signal
// TODO: understand, tweak, experiment
function findFundamentalFrequency(buffer, sampleRate) {
  const n = 1024
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

function detectPitch() {
  const buffer = new Uint8Array(analyzer.fftSize)
  analyzer.getByteTimeDomainData(buffer)
  const frequency = findFundamentalFrequency(buffer, audioContext.sampleRate)
  if (frequency !== -1) {
    // console.log(frequency)
    if (pitchDetectCallback) {
      pitchDetectCallback(frequency)
    }
  } else {
    console.log('no frequency found')
    pitchDetectCallback(-1)
  }

  requestAnimationFrame(detectPitch)
}
