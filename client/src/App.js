import React, { Component } from 'react'
import './App.css'

import { CenterListing, CenterCreator } from './components'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        <CenterCreator />
        <CenterListing />
      </div>
    )
  }
}

export default App
