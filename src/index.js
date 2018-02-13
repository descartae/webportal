import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

import './index.css'

const rootComponent = (
  <App />
)

ReactDOM.render(rootComponent, document.getElementById('root'))
registerServiceWorker()
