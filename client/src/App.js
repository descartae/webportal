import React, { Component } from 'react'
import './App.css'

import { CenterListing, CenterCreator, CenterDetail } from './components'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='navbar'>Descartae</div>
        <CenterCreator />
        <br />
        <br />
        <CenterListing>
          <CenterDetail/>
        </CenterListing>
      </div>
    )
  }
}

export default App
