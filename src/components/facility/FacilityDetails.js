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
import DeleteIcon from 'material-ui-icons/Delete'
import AccessTimeIcon from 'material-ui-icons/AccessTime'
import LocationOnIcon from 'material-ui-icons/LocationOn'
import FeedbackIcon from 'material-ui-icons/Feedback'
import Dialog, { DialogContent, DialogActions } from 'material-ui/Dialog'

import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'

import ConfirmDialog from '../ConfirmDialog'
import ForRole from '../ForRole'
import NotFound from '../NotFound'
import Loading from '../Loading'

import { FacilityFieldsFragment, FacilityListQuery } from './FacilityListing'

class FacilityDetails extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  static styles = theme => ({
    field: {
      marginTop: 16
    },
    facilityTitle: {
      marginBottom: 40
    },
    edit: {
      float: 'right'
    },
    delete: {
      float: 'right',
      marginLeft: 10
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
    },
    mapDialog: {
      width: '500px',
      height: '300px'
    },
    timeTableDialog: {
      width: '400px',
      height: '500px'
    },

    buttonIcon: {
      marginRight: theme.spacing.unit
    }
  })

  state = {
    mapOpened: false,
    timeTableOpened: false,
    deleteConfirmationOpened: false
  }

  handleMapDialogOpen = () => {
    this.setState({ mapOpened: true })
  };

  handleMapDialogClose = () => {
    this.setState({ mapOpened: false })
  };

  handleTimeTableOpen = () => {
    this.setState({ timeTableOpened: true })
  };

  handleTimeTableClose = () => {
    this.setState({ timeTableOpened: false })
  };

  onDelete (e) {
    e.preventDefault()
    this.setState({ deleteConfirmationOpened: true })
  }

  async onConfirmDelete (confirmed) {
    this.setState({ deleteConfirmationOpened: false })
    if (confirmed) {
      const { data } = await this.props.FacilityDisableMutation()
      if (data.disableFacility && data.disableFacility.success) {
        this.props.history.push('/facilities')
      }
    }
  }

  render () {
    const {
      classes, theme, google, match,
      FacilityDetailsQuery: { loading, error, facility }
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
        <ConfirmDialog
          title='Deletar ponto de coleta'
          opened={this.state.deleteConfirmationOpened}
          onConfirm={() => this.onConfirmDelete(true)}
          onCancel={() => this.onConfirmDelete(false)}
        >
          <p>Você tem certeza que deseja deletar esse ponto de coleta?</p>
          <p>Essa ação não pode ser desfeita.</p>
        </ConfirmDialog>

        <ForRole roles={['ADMIN', 'MAINTAINER']}>
          <Button variant='fab' mini color='primary' onClick={this.onDelete.bind(this)} className={classes.delete}>
            <DeleteIcon />
          </Button>
          <Button variant='fab' mini color='secondary' component={Link} to={`/facilities/edit/${facility._id}`} className={classes.edit}>
            <EditIcon />
          </Button>
        </ForRole>

        <Typography variant='title' className={classes.facilityTitle}>
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

        <p>
          <Button onClick={this.handleTimeTableOpen} className={classes.buttonIcon} color='primary' variant='raised' size='small'>
            <AccessTimeIcon className={classes.buttonIcon} />
            Horários
          </Button>

          <Button onClick={this.handleMapDialogOpen} className={classes.buttonIcon} color='primary' variant='raised' size='small'>
            <LocationOnIcon className={classes.buttonIcon} />
            Mapa
          </Button>

          <Button component={Link} to={`${match.url}/feedbacks`} className={classes.buttonIcon} color='primary' variant='raised' size='small'>
            <FeedbackIcon className={classes.buttonIcon} />
            Feedbacks
          </Button>
        </p>

        <Dialog
          open={this.state.timeTableOpened}
          onClose={this.handleTimeTableClose}
          classes={{ paper: classes.timeTableDialog }}>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleTimeTableClose} color='primary' autoFocus>
              Fechar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.mapOpened}
          onClose={this.handleMapDialogClose}
          classes={{ paper: classes.mapDialog }}>
          <Map google={google} zoom={14}
            containerStyle={FacilityDetails.styles(theme).map}
            initialCenter={{
              lat: coordinates.latitude,
              lng: coordinates.longitude
            }}>
            <Marker position={{
              lat: coordinates.latitude,
              lng: coordinates.longitude
            }} />
          </Map>
          <DialogActions>
            <Button onClick={this.handleMapDialogClose} color='primary' autoFocus>
              Fechar
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    )
  }
}

export const FacilityDetailsQuery = gql`
  query FacilityDetailsQuery($facilityId: ID!) {
    facility(_id: $facilityId) {

      ...FacilityFieldsFragment

      telephone
      website

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

  ${FacilityFieldsFragment}
`
export const FacilityDisableMutation = gql`
  mutation FacilityDisableMutation (
    $facilityId: ID!
  ) {
    disableFacility(input: {
      _id: $facilityId
    }) {
      success
    }
  }
`

export default compose(
  withStyles(FacilityDetails.styles, { withTheme: true }),
  graphql(FacilityDisableMutation, {
    name: 'FacilityDisableMutation',
    options: (props) => ({
      variables: { facilityId: props.match.params.facilityId },
      refetchQueries: [FacilityListQuery.name]
    })
  }),
  graphql(FacilityDetailsQuery, {
    name: 'FacilityDetailsQuery',
    options: (props) => ({
      variables: { facilityId: props.match.params.facilityId }
    })
  }),
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAPS_API_KEY
  })
)(FacilityDetails)
