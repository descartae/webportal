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
    theme: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  static contextTypes = {
    auth: PropTypes.object.isRequired
  }

  static styles = theme => ({
    root: {
      overflow: 'hidden',
      padding: `0 ${theme.spacing.unit * 3}px`,
    },
    wrapper: {
      maxWidth: theme.page.maxWidth,    
      margin: 'auto'
    },
    minWrapper: {
      maxWidth: '400px',
      margin: 'auto'
    },
    paper: {
      margin: theme.spacing.unit,
      padding: theme.spacing.unit * 2,
    },
    add: {
      marginLeft: theme.spacing.unit,
      float: 'right'
    },
    addIcon: {
      marginRight: theme.spacing.unit,
    },
  })

  render () {
    const { location, match, classes } = this.props
    const { auth: { roles} } = this.context
    // Get the location user ID
    const path = location.pathname.split("/");
    const pageUserId = path[path.length-1];
    // if the logged user ID matches the location user ID, the logged user should have access to their account information/edit their account. Otherwise, only administrators get to have access to all users - create, edit, and view.

    if (roles.indexOf('ADMIN') === -1 && pageUserId === this.context.auth.id) {
      return (
       <div className={classes.root}>
        <div className={classes.minWrapper}>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={16}>
              <Grid item xs zeroMinWidth>
                { !match.isExact ? (
                  <Switch>
                    <Route path={`${match.url}/edit/:userId`} component={UserEditor} />
                    <Route path={`${match.url}/view/:userId`} component={UserDetails} />
                  </Switch>
                ) : null }
              </Grid>
            </Grid>
          </Paper>

        </div>
      </div>
      )
    } else if (roles.indexOf('ADMIN') === -1) {
      return (<Unauthorized />)
    } 

    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={16}>
              <Grid item xs size={8}>
                <Typography variant='headline'>
                  Usuários
                <Button variant='fab' mini color='secondary' component={Link} to={`${match.url}/add`} className={classes.add}>
                  <AddIcon className={classes.addIcon} />
                </Button>
                </Typography>
                <UserListing pageSize={20} />
              </Grid>
                { !match.isExact ? (
                  <Grid item xs size={8} >
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

        </div>
      </div>
    )
  }
}

export default withStyles(User.styles, { withTheme: true })(User)
