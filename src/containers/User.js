import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'

import {
  UserDetails,
  UserListing,
  UserEditor
} from '../components/user'

import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

import Unauthorized from '../components/Unauthorized'

class User extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  static contextTypes = {
    auth: PropTypes.object.isRequired
  }

  static styles = theme => ({
    add: {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed'
    },
    paper: {
      padding: 16
    }
  })

  render () {
    const { match, classes } = this.props
    const { auth: { roles } } = this.context

    if (roles.indexOf('ADMIN') === -1) {
      return (<Unauthorized />)
    }

    return (
      <div>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='headline'>
                Usuários
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <UserListing pageSize={5} />
            </Grid>
            { !match.isExact ? (
              <Grid item xs={12} >
                <Paper className={classes.paper}>
                  <Switch>
                    <Route path={`${match.url}/add`} component={UserEditor} />
                    <Route path={`${match.url}/edit/:userId`} component={UserEditor} />
                    <Route path={`${match.url}/view/:userId`} component={UserDetails} />
                  </Switch>
                </Paper>
              </Grid>
            ) : null }
          </Grid>
        </Paper>

        <Button variant='fab' color='secondary' component={Link} to={`${match.url}/add`} className={classes.add}>
          <AddIcon />
        </Button>
      </div>
    )
  }
}

export default withStyles(User.styles, { withTheme: true })(User)
