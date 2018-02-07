import React, { Component } from 'react'

import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'

class Facility extends Component {
  render () {
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Paper style={{ padding: 16 }}>
              <Typography type='headline'>
                Bem-vindo ao Descartaê!
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Facility
