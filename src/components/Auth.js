import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router'
import { withStyles } from 'material-ui/styles'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Dialog, { DialogContent, DialogActions } from 'material-ui/Dialog'
import Typography from 'material-ui/Typography'

import logo from '../logo.png'

const signupEnabled = process.env.REACT_APP_SIGNUP === 'true'

class Auth extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  state = {
    email: '',
    password: '',
    dialogOpen: false
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
    centerer: {
      textAlign: 'center'
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

  async onLogin (e) {
    e.preventDefault()

    const { data: { authenticate } } = await this.props.AuthenticateMutation({
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

  async onCreateUser (e) {
    e.preventDefault()

    this.setState({
      dialogOpen: true
    })
  }

  handleDialogClose = event => {
    this.setState({
      dialogOpen: false
    })
  }

  async onSignUp (e) {
    e.preventDefault()

    const { data: { addSelfUser } } = await this.props.SignUpMutation({
      variables: { name: this.state.name, email: this.state.email, password: this.state.password }
    })

    if (addSelfUser) {
      const { success } = addSelfUser
      if (success) {
        this.onLogin(e)
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
          <form onSubmit={this.onLogin.bind(this)}>

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
              autoComplete='off'
              value={this.state.password}
              onChange={this.handleChange('password')}
            />

            <div>
              <Button variant='raised' color='primary' type='submit' className={classes.submit}>
                Entrar
              </Button>
            </div>
          </form>

          { signupEnabled ? (

          <div>

            <Button variant='raised' color='primary' className={classes.submit} onClick={this.onCreateUser.bind(this)}>
              Criar Conta
            </Button>

            <Dialog
              open={this.state.dialogOpen}
              onClose={this.handleDialogClose}>
              <DialogContent>

                <Typography variant='title'>
                  Criar nova conta
                </Typography>

                <p>Preencha os campos abaixo para criar uma nova conta.</p>

                <form onSubmit={this.onSignUp.bind(this)}>
                  <TextField
                    label='Nome'
                    value={this.state.name}
                    fullWidth
                    margin='normal'
                    onChange={this.handleChange('name')}
                    className={classes.field}
                  />
                  <TextField
                    label='E-mail'
                    type='email'
                    fullWidth
                    margin='normal'
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                  />

                  <TextField
                    label='Senha'
                    type='password'
                    fullWidth
                    margin='normal'
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                  />

                  <div className={classes.centerer}>
                    <Button variant='raised' color='primary' type='submit' className={classes.submit}>
                      Criar
                    </Button>
                  </div>
                </form>

              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleDialogClose} color='primary' autoFocus>
                  Fechar
                </Button>
              </DialogActions>
            </Dialog>

          </div>

          ) : null }

        </Paper>
      </div>
    )
  }
}

const AuthenticateMutation = gql`
  mutation AuthenticateMutation ($email: String!, $password: String!) {
    authenticate(credentials: {email: $email, password: $password}) {
      success
      error
      sessionToken
    }
  }
`

const SignUpMutation = gql`
  mutation SignUpMutation ($name: String!, $email: String!, $password: String!) {
    addSelfUser(input:{
      name: $name
      email: $email
      password: $password
    }){
      success
    }
  }
`

export default compose(
  withRouter,
  withStyles(Auth.styles, { withTheme: true }),
  graphql(AuthenticateMutation, {
    name: 'AuthenticateMutation'
  }),
  graphql(SignUpMutation, {
    name: 'SignUpMutation'
  })
)(Auth)
