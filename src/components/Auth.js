import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export class Auth extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: 'user@example.com',
      password: 'example'
    }
  }

  async onSubmit (e) {
    e.preventDefault()

    const { data: { authenticate } } = await this.props.mutate({
      variables: { email: this.state.email, password: this.state.password }
    })

    if (authenticate) {
      const { success, sessionToken } = authenticate
      if (success) {
        localStorage.setItem('token', sessionToken)
      }
    }

    return false
  }

  render () {
    return (
      <div className='auth'>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>
            E-mail:
            <input
              type='text'
              name='email'
              value={this.state.email}
              onChange={(e) => this.setState({email: e.target.value})}
            />
          </label>
          <label>
            Senha:
            <input
              type='password  '
              name='password'
              value={this.state.password}
              onChange={(e) => this.setState({password: e.target.value})}
            />
          </label>
          <button type='submit'>Entrar</button>
        </form>
      </div>
    )
  }
}

const authenticate = gql`
  mutation($email: String!, $password: String!) {
    authenticate(credentials: {email: $email, password: $password}) {
      success
      error
      sessionToken
    }
  }
`

export const AuthWithData = graphql(authenticate)(Auth)
