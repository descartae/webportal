import React from 'react'
import NotFound from './NotFound'
import {
  gql,
  graphql
} from 'react-apollo'

import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Chip from 'material-ui/Chip'
import Paper from 'material-ui/Paper'
import { CircularProgress } from 'material-ui/Progress'

const FacilityDetails = ({ google, data: { loading, error, facility } }) => {
  if (loading) {
    return <div style={{ textAlign: 'center' }}><CircularProgress size={50} /></div>
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

  return (
    <div>
      <Typography type='title'>
        {facility.name}
      </Typography>
      <p>Endereço: {facility.location.address}, {facility.location.municipality}, {facility.location.state} {facility.location.zip}</p>
      <p>Contato: {facility.telephone}</p>
      <Paper style={{
        padding: 5,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        { facility.typesOfWaste.map(it => (
          <Chip
            key={it._id}
            avatar={<Avatar src={it.icons.androidMediumURL} />}
            label={it.name}
            style={{ margin: 5 }}
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

      <Map google={google} zoom={14} containerStyle={{
        position: 'relative',
        width: '100%',
        height: '300px'
      }}>
        <Marker name={'Current location'} />
      </Map>

    </div>
  )
}

const facilityDetailsQuery = gql`
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

const GoogleFacilityDetails = GoogleApiWrapper({
  apiKey: 'myapikey'
})(FacilityDetails)

export default graphql(facilityDetailsQuery, {
  options: (props) => ({
    variables: { facilityId: props.match.params.facilityId }
  })
})(GoogleFacilityDetails)
