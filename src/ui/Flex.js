import styled from 'styled-components'

// A flexbox configured with the most commonly used flex
// properties in the app.
export default styled.div`
  display: flex;

  /* Grow down */
  flex-flow: ${props => (props.row ? 'row' : 'column')};

  /* Grow and shrink without a basis */
  flex: 1 1 0;

  /* Prevent child elements from pushing out the size of this one */
  overflow: hidden;
`
