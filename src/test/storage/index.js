import * as settings from './settings'
import * as samples from './samples'

export function load() {
  return samples.load().then(samples => ({
    ...settings.load(),
    samples,
  }))
}

export const saveSettings = settings.save
export const saveSample = samples.save
