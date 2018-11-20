import React from 'react'
import styled from 'styled-components'
import IconButton from './IconButton'
import { ReactComponent as MicIcon } from './mic.svg'

const FilledMicIcon = styled(MicIcon)`
  path {
    fill: var(--color) !important;
  }
`

export default function MicButton(props) {
  return (
    <IconButton {...props}>
      <FilledMicIcon />
    </IconButton>
  )
}
