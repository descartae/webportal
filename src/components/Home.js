import React, { Component } from 'react'

export class Home extends Component {
  async onClick () {
    localStorage.removeItem('token')
  }

  render () {
    return (
      <div className='home'>
        Bem-vindo ao Descartaê!
        <button onClick={this.onClick.bind(this)}>Logout</button>
      </div>
    )
  }
}
