import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import FacilityListing from '../components/FacilityListing'
import FacilityDetails from '../components/FacilityDetails'

import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'

class Facility extends Component {
  render () {
    const { match } = this.props

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
            <Grid item xs={6}>
              <Route path={`${match.url}/:facilityId`} component={FacilityDetails} />
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default Facility
