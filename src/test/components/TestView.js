import React from 'react'
import styled from 'styled-components'
import Flex from '../../components/Flex'
import FrequencySlider from '../../components/FrequencySlider'
import FrequencyGraph from './FrequencyGraph'
import TimeGraph from './TimeGraph'

const Container = styled(Flex)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-bottom: 1.5em;
`

const Label = styled(Flex)`
  flex: 0 0 auto;
  text-transform: lowercase;
  padding: 1em;
  font-family: ${props => props.theme.text.family.display};
  color: ${props => props.theme.text.color};
`

const LabelledDisplay = ({ label, children: display }) => (
  <Flex style={{ padding: '0.25em' }}>
    <Label>{label}</Label>
    <Flex>{display}</Flex>
  </Flex>
)

export default ({ controls, displays, frequencyData, timeData }) => (
  <Container>
    <LabelledDisplay label="input">{controls}</LabelledDisplay>
    {displays.map(display => (
      <LabelledDisplay key={display.label} label={display.label}>
        <FrequencySlider frequency={display.frequency} />
      </LabelledDisplay>
    ))}
    <LabelledDisplay label="frequency">
      <FrequencyGraph data={frequencyData} />
    </LabelledDisplay>
    <LabelledDisplay label="time">
      <TimeGraph data={timeData} />
    </LabelledDisplay>
  </Container>
)
