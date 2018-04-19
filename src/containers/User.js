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
    const { match, classes } = this.props
    const { auth: { roles } } = this.context

    if (roles.indexOf('ADMIN') === -1) {
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
                <UserListing pageSize={6} />
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
