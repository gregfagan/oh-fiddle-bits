import React, { PureComponent } from 'react'
import styled from 'styled-components'

import Flex from '../ui/Flex'
import FrequencyInputSlider from '../ui/FrequencyInputSlider'
import MicButton from '../ui/buttons/MicButton'
import ToneButton from '../ui/buttons/ToneButton'
import RecordButton from './RecordButton'

import inputs from './inputs'

const inputButtons = {
  [inputs.tone]: ToneButton,
  [inputs.mic]: MicButton,
}

class InputButton extends PureComponent {
  changeInput = e => {
    const { onChange } = this.props
    const { input } = e.target.dataset
    if (input && onChange) onChange(input)
  }

  render() {
    const { base: Button, current, value } = this.props
    return (
      <Flex key={value}>
        <Button
          data-input={value}
          on={current === value}
          onClick={current !== value ? this.changeInput : undefined}
        />
      </Flex>
    )
  }
}

const InputSelectorContainer = styled(Flex)`
  flex: 0 0 64px;
`

export const InputSelector = props => (
  <InputSelectorContainer>
    {Object.keys(inputButtons).map(key => (
      <InputButton key={key} value={key} base={inputButtons[key]} {...props} />
    ))}
  </InputSelectorContainer>
)

export const ToneControls = ({ frequency, onChange }) => (
  <FrequencyInputSlider
    frequency={frequency}
    pixelsPerCent={0.5}
    onFrequencyChange={onChange}
  />
)

const ButtonLabel = styled(Flex)`
  flex: 0 0 auto;
  margin: 1em;
  align-self: center;
  font-family: ${props => props.theme.text.family.display};
  color: ${props => (props.on ? props.theme.active : props.theme.inactive)};
`

export const MicControls = ({ isRecording, onChange }) => (
  <Flex style={{ alignItems: 'center' }}>
    <RecordButton on={isRecording} onClick={onChange} />
    <ButtonLabel on={isRecording}>record</ButtonLabel>
  </Flex>
)
