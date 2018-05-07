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
    theme: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
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
      marginRight: theme.spacing.unit
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
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={16}>
              <Grid item xs size={8}>
                <Typography variant='headline'>
                  Pontos de coleta
                  <ForRole roles={['ADMIN', 'MAINTAINER']}>
                    <Button variant='raised' color='secondary' component={Link} to={`/facilities/add`} className={classes.add}>
                      <AddIcon className={classes.addIcon} /> Criar novo
                    </Button>
                  </ForRole>
                </Typography>
                <FacilityListing pageSize={6} />
              </Grid>
              <Grid item xs size={8}>
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
       </div>

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
