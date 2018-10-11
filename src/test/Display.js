import React from 'react'
import styled from 'styled-components'

import {
  autocorrelatePitch,
  harmonicSumSpectrum,
  harmonicProductSpectrum,
} from '../audio/signal'

import Flex from '../ui/Flex'
import FrequencySlider from '../ui/FrequencySlider'
import FrequencyGraph from './FrequencyGraph'
import TimeGraph from './TimeGraph'

const hssHarmonics = 5
const hpsHarmonics = 3

export default function Display({
  inputSelector,
  controls,
  time,
  frequency,
  sampleRate,
  windowSize,
}) {
  return (
    <Container>
      <Input>
        {inputSelector}
        {controls}
        <TimeGraph data={time} />
        <FrequencyGraph data={frequency.normalized} />
      </Input>
      <LabelledFrequencySlider
        label="autocorrelated"
        frequency={autocorrelatePitch(time, sampleRate)}
      />
      <LabelledFrequencySlider
        label="HSS"
        frequency={harmonicSumSpectrum(
          frequency.normalized,
          windowSize,
          hssHarmonics,
        )}
      />
      <LabelledFrequencySlider
        label="HPS"
        frequency={harmonicProductSpectrum(
          frequency.normalized,
          frequency.rebased,
          windowSize,
          hpsHarmonics,
        )}
      />
    </Container>
  )
}

const Container = styled(Flex)`
  > * {
    margin-bottom: 2%;
  }
`

const Label = styled(Flex)`
  position: absolute;
  flex: 0 0 auto;
  text-transform: lowercase;
  margin: 1em 0em 0em 1em;
  font-family: ${props => props.theme.text.family.display};
  color: ${props => props.theme.text.color};
`

const LabelledFrequencySlider = ({ frequency, label }) => (
  <Flex style={{ position: 'relative' }}>
    <FrequencySlider frequency={frequency} />
    <Label>{label}</Label>
  </Flex>
)

const Input = styled(Flex)`
  flex-direction: row;
  > * {
    margin-left: 2%;
  }
`
