import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { gql, graphql, compose } from 'react-apollo'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Typography from 'material-ui/Typography'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import EditIcon from 'material-ui-icons/Edit'

import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'

import ForRole from '../ForRole'
import NotFound from '../NotFound'
import Loading from '../Loading'

class FacilityDetails extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  static styles = theme => ({
    field: {
      marginTop: 16
    },
    edit: {
      float: 'right'
    },
    typesOfWaste: {
      padding: 5,
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    typeOfWaste: {
      margin: 5
    },
    map: {
      position: 'relative',
      width: '100%',
      height: '300px'
    }
  })

  render () {
    const {
      classes, theme, google,
      data: { loading, error, facility }
    } = this.props

    if (loading) {
      return <Loading />
    }

    if (error) {
      return <p>{ error.message }</p>
    }

    if (facility === null) {
      return <NotFound />
    }

    const weekDays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
    const ptWeekDays = {
      MONDAY: 'Segunda-feira',
      TUESDAY: 'Terça-feira',
      WEDNESDAY: 'Quarta-feira',
      THURSDAY: 'Quinta-feira',
      FRIDAY: 'Sexta-feira',
      SATURDAY: 'Sábado',
      SUNDAY: 'Domingo'
    }
    const openHours = weekDays.map(d => {
      const open = facility.openHours.find((it) => it.dayOfWeek === d)
      if (open) return { dayOfWeek: d, ptDayOfWeek: ptWeekDays[d], time: `${open.startTime} - ${open.endTime}` }
      return { dayOfWeek: d, ptDayOfWeek: ptWeekDays[d], time: 'Fechado' }
    })

    const { coordinates } = facility.location

    return (
      <div>
        <ForRole roles={['ADMIN', 'MAINTAINER']}>
          <Button variant='fab' mini color='secondary' component={Link} to={`/facilities/edit/${facility._id}`} className={classes.edit}>
            <EditIcon />
          </Button>
        </ForRole>

        <Typography variant='title'>
          {facility.name}
        </Typography>

        <p>Endereço: {facility.location.address}, {facility.location.municipality}, {facility.location.state} {facility.location.zip}</p>
        <p>Contato: {facility.telephone}</p>

        <Paper className={classes.typesOfWaste} elevation={0}>
          { facility.typesOfWaste.map(it => (
            <Chip
              key={it._id}
              avatar={<Avatar src={it.icons.androidMediumURL} />}
              label={it.name}
              className={classes.typeOfWaste}
            />
          ))}
        </Paper>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Dia da semana</TableCell>
              <TableCell>Horário</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {openHours.map(it => {
              return (
                <TableRow key={it.dayOfWeek}>
                  <TableCell>{it.ptDayOfWeek}</TableCell>
                  <TableCell>{it.time}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        <Map google={google} zoom={14}
          containerStyle={FacilityDetails.styles(theme).map}
          initialCenter={{
            lat: coordinates.latitude,
            lng: coordinates.longitude
          }}
        >
          <Marker position={{
            lat: coordinates.latitude,
            lng: coordinates.longitude
          }} />
        </Map>
      </div>
    )
  }
}

export const facilityDetailsQuery = gql`
  query FacilityDetailsQuery($facilityId: ID!) {
    facility(_id: $facilityId) {
      _id
      name
      telephone
      website
      location {
        address
        municipality
        state
        zip
        coordinates {
          latitude
          longitude
        }
      }
      typesOfWaste {
        _id
        name
        icons {
          androidMediumURL
        }
      }
      openHours {
        dayOfWeek
        startTime
        endTime
      }
    }
  }
`

export default compose(
  withStyles(FacilityDetails.styles, { withTheme: true }),
  graphql(facilityDetailsQuery, {
    options: (props) => ({
      fetchPolicy: 'network-only',
      variables: { facilityId: props.match.params.facilityId }
    })
  }),
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAPS_API_KEY
  })
)(FacilityDetails)
