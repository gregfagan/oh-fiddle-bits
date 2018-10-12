const key = 'TestAnalyserSettings'

export function load() {
  return JSON.parse(localStorage.getItem(key))
}

export function save(settings) {
  localStorage.setItem(key, JSON.stringify(settings))
}
