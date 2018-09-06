import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Option } from './components/Navigator'
import registerServiceWorker from './registerServiceWorker'

if (process.env.NODE_ENV === 'production') {
  ReactDOM.render(<App />, document.getElementById('root'))
  registerServiceWorker()
} else {
  import('./test/components/TestAnalyser').then(({ default: TestAnalyser }) => {
    ReactDOM.render(
      <App
        extraOptions={[
          <Option key="test" render={() => <TestAnalyser />}>
            test
          </Option>,
        ]}
      />,
      document.getElementById('root'),
    )
  })
}
