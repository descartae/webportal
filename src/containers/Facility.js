import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'

import {
  FacilityHome,
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
      marginLeft: theme.spacing.unit,
      float: 'right'
    },
    addIcon: {
      marginRight: theme.spacing.unit
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
            <Grid item xs={10}>
              <Typography variant='headline'>
                Pontos de coleta
                <ForRole roles={['ADMIN', 'MAINTAINER']}>
                  <Button variant='raised' color='secondary' component={Link} to={`/facilities/add`} className={classes.add}>
                    <AddIcon className={classes.addIcon} /> Criar novo
                  </Button>
                </ForRole>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <FacilityListing pageSize={4} />
            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={4} >
              <Paper className={classes.paper}>
                <Switch>
                  <Route path={`${match.url}/add`} component={FacilityEditor} />
                  <Route path={`${match.url}/edit/:facilityId`} component={FacilityEditor} />
                  <Route path={`${match.url}/edit/:facilityId/feedbacks`} component={FacilityEditor} />
                  <Route path={`${match.url}/view/:facilityId`} component={FacilityDetails} />
                  <Route path={`${match.url}/`} component={FacilityHome} />
                </Switch>
              </Paper>
            </Grid>
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
