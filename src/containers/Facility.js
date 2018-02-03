import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Route, Switch, Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';

import FacilityListing from '../components/FacilityListing'
import FacilityDetails from '../components/FacilityDetails'
import FacilityEditor from '../components/FacilityEditor'

import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon';

class Facility extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }

  static styles = theme => ({
    fabAdd: {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    },
  })

  render () {
    const { match, classes } = this.props

    return (
      <div>
        <Paper style={{ padding: 16 }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography type='headline'>
                Pontos de coleta 
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FacilityListing {...this.props} />
            </Grid>
            { !match.isExact ? (
            <Grid item xs={6} >
              <Paper style={{ padding: 16 }}>
                <Switch>
                  <Route path={`${match.url}/add`} component={FacilityEditor} />
                  <Route path={`${match.url}/edit/:facilityId`} component={FacilityEditor} />
                  <Route path={`${match.url}/view/:facilityId`} component={FacilityDetails} />
                </Switch>
              </Paper>
            </Grid>
            ) : null }
          </Grid>
        </Paper>

        <Button fab color="secondary" component={Link} to={`/facilities/add`} className={classes.fabAdd}>
          <Icon>add_icon</Icon>
        </Button>
      </div>
    )
  }
}

export default withStyles(Facility.styles, { withTheme: true })(Facility);