import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import './index.css'
import logo from '../../logo.png'

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
        this.props.history.go()
      }
    }

    return false
  }

  render () {
    return (
      <div className='page-auth'>
        <Paper className="container" zDepth={1} style={{
        }}>
          <img src={logo} alt='logo' />
          <form onSubmit={this.onSubmit.bind(this)}>

            <TextField
              value={this.state.email}
              onChange={(e) => this.setState({email: e.target.value})}
              floatingLabelText="E-mail"
            />

            <TextField
              value={this.state.password}
              onChange={(e) => this.setState({password: e.target.value})}
              floatingLabelText="Senha"
            />
            
            <RaisedButton type='submit' className="submit" label="Entrar" primary={true} />
          </form>
        </Paper>
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

export const AuthWithData = withRouter(graphql(authenticate)(Auth))
