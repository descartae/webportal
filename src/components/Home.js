import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

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
