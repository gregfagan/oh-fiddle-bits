import React from 'react'

import IconButton from '../ui/buttons/IconButton'

export default props => (
  <IconButton {...props}>
    <svg viewBox="0 0 1 1">
      <circle cx="0.5" cy="0.5" r="0.25" fill="var(--color)" />
    </svg>
  </IconButton>
)
