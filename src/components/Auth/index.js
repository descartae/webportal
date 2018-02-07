import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import './index.css'
import logo from '../../logo.png'

class Auth extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: 'user@example.com',
      password: 'example'
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
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
        <Paper className='container'>
          <img src={logo} alt='logo' />
          <form onSubmit={this.onSubmit.bind(this)}>

            <TextField
              label='E-mail'
              type='email'
              margin='normal'
              value={this.state.email}
              onChange={this.handleChange('email')}
            />

            <TextField
              label='Senha'
              type='password'
              margin='normal'
              value={this.state.password}
              onChange={this.handleChange('password')}
            />

            <div>
              <Button variant='raised' color='primary' type='submit' className='submit'>
                Entrar
              </Button>
            </div>
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

export default withRouter(graphql(authenticate)(Auth))
