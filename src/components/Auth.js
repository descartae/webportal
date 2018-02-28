import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router'
import { withStyles } from 'material-ui/styles'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import logo from '../logo.png'
import Dialog, { DialogContent, DialogActions } from 'material-ui/Dialog'

class Auth extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  state = {
    email: '',
    password: ''
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

  handleModelClose (e) {
    e.preventDefault()
    
    //set prev state to false
    this.setState({
      dialogOpen: false
    })  

  }

  async onSubmit (e) {
    e.preventDefault()

    const { data: { authenticate } } = await this.props.authenticate({
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

  async onCreate (e) {
    e.preventDefault()

    // setting the dialog state to be true 
    this.setState({
      dialogOpen: true
    })

    
  }

  async onSignUp (e) {
    e.preventDefault()

    const { data: { addSelfUser } } = await this.props.signUp({
      variables: { name: this.state.name, email: this.state.email, password: this.state.password }
    })

    if (addSelfUser) {
      const { success } = addSelfUser
      if (success) {
        this.onSubmit(e)
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
              <Button variant='raised' color='primary' onClick={this.onCreate.bind(this)}>
                Create Account
              </Button>

        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleModelClose}
          classes={{ paper: classes.dialogOpen }}>
          <DialogContent>

        <form onSubmit={this.onSignUp.bind(this)}>
          <TextField
            label='Nome'
            value={this.state.name}
            onChange={this.handleChange('name')}
            fullWidth
            className={classes.field}
          />
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
            <Button variant='raised' color='primary' type='submit' className={classes.submit}>
                Entrar
            </Button>
          </form>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleModelClose} color='primary' autoFocus>
              Fechar
            </Button>
          </DialogActions>
        </Dialog>

            
        </Paper>
      </div>
    )
  }
}

const authenticate = gql`
  mutation authenticate($email: String!, $password: String!) {
    authenticate(credentials: {email: $email, password: $password}) {
      success
      error
      sessionToken
    }
  }
`

const signUp = gql`
  mutation signUp($name: String!, $email: String!, $password: String!) {
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
  graphql(authenticate, {
    name: 'authenticate'
  }),
  graphql(signUp, {
    name: 'signUp'
  })
)(Auth)
