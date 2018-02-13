import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router'
import { withStyles } from 'material-ui/styles'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import logo from '../logo.png'

class Auth extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  state = {
    email: 'user@example.com',
    password: 'example'
  }

  static styles = theme => ({
    root: {
      textAlign: 'center'
    },
    container: {
      width: 300,
      margin: 20,
      padding: 10,
      textAlign: 'center',
      display: 'inline-block'
    },
    logo: {
      height: 120,
      margin: 10
    },
    submit: {
      margin: 10
    }
  })

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
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Paper className={classes.container}>
          <img src={logo} alt='logo' className={classes.logo} />
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
              <Button variant='raised' color='primary' type='submit' className={classes.submit}>
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

export default compose(
  withRouter,
  withStyles(Auth.styles, { withTheme: true }),
  graphql(authenticate)
)(Auth)
