import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'

import {
  FacilityDetails,
  FacilityListing,
  FacilityEditor,
  FacilityFeedbackListing,
  FacilityFeedbackDetails
} from '../components/facility'

import { ForRole } from '../components'

import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Dialog, { DialogContent } from 'material-ui/Dialog'

class Facility extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
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
    },
    dialog: {
      width: 500
    },
    feedbackList: {
      height: 200,
      maxHeight: 200,
      overflowY: 'auto',
      overflowX: 'hidden'
    }
  })

  render () {
    const { match, classes } = this.props

    return (
      <div>
        <Paper className={classes.paper}>
          <Grid container>
          <Grid item xs={12}>
              <Typography variant='headline'>
                Pontos de coleta
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <FacilityListing pageSize={4} />
            </Grid>
            <Grid item xs={1}>
              <ForRole roles={['ADMIN', 'MAINTAINER']}>
                <Button variant='fab' color='secondary' component={Link} to={`/facilities/add`} className={classes.add}>
                  <AddIcon />
                </Button>
              </ForRole>
            </Grid>
            { !match.isExact ? (
              <Grid item xs={4} >
                <Paper className={classes.paper}>
                  <Switch>
                    <Route path={`${match.url}/add`} component={FacilityEditor} />
                    <Route path={`${match.url}/edit/:facilityId`} component={FacilityEditor} />
                    <Route path={`${match.url}/edit/:facilityId/feedbacks`} component={FacilityEditor} />
                    <Route path={`${match.url}/view/:facilityId`} component={FacilityDetails} />
                  </Switch>
                </Paper>
              </Grid>
            ) : null }
          </Grid>
        </Paper>

        <Route path={`${match.url}/view/:facilityId/feedbacks`} render={
          (routeProps) => (
            <Dialog
              open
              classes={{
                paper: classes.dialog
              }}
              onClose={() =>
                routeProps.history.push(routeProps.match.url.split('/feedbacks')[0])
              }>
              <DialogContent>
                <Paper>
                  <Route path={`${match.url}/view/:facilityId/feedbacks`} render={
                    routeProps => <FacilityFeedbackListing {...routeProps} pageSize={10} classes={{
                      root: classes.feedbackList
                    }} />
                  } />
                </Paper>

                <Route exact path={`${match.url}/view/:facilityId/feedbacks/:feedbackId`} render={
                  routeProps => (
                    <Paper className={classes.paper}>
                      <FacilityFeedbackDetails {...routeProps} />
                    </Paper>
                  )} />

              </DialogContent>
            </Dialog>
          )} />

      </div>
    )
  }
}

export default withStyles(Facility.styles, { withTheme: true })(Facility)
