import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

import App from './App'

if (process.env.NODE_ENV === 'production') {
  ReactDOM.render(<App />, document.getElementById('root'))
  registerServiceWorker()
} else {
  import('./test/components/TestAnalyser').then(({ default: TestAnalyser }) => {
    ReactDOM.render(
      <App extraOptions={[{ name: 'test', view: TestAnalyser }]} />,
      document.getElementById('root'),
    )
  })
}
