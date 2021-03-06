import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { gql, graphql, compose } from 'react-apollo'
import qs from 'query-string'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import ContentClear from 'material-ui-icons/Clear'
import Typography from 'material-ui/Typography'
import Select from 'material-ui/Select'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { ListItemIcon, ListItemText } from 'material-ui/List'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import { FormControl } from 'material-ui/Form'
import ConfirmDialog from '../ConfirmDialog'
import NotFound from '../NotFound'
import Unauthorized from '../Unauthorized'
import Loading from '../Loading'
import { Paper } from 'material-ui'

import { FacilityFieldsFragment, FacilityListQuery } from './FacilityListing'

function generateEmptyCalendar () {
  var openHours = []
  for (var day of ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']) {
    openHours.push({
      dayOfWeek: day,
      startTime: '',
      endTime: ''
    })
  }
  return openHours
}

class FacilityEditor extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  static contextTypes = {
    auth: PropTypes.object.isRequired
  }

  static styles = theme => ({
    paper: {
      padding: 16
    },
    cancel: {
      float: 'right',
      marginLeft: 10
    },
    typesOfWaste: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    field: {
      marginTop: 16
    }
  })

  state = {
    _id: null,
    name: '',
    telephone: '',
    website: '',
    address: '',
    municipality: '',
    state: '',
    zip: '',
    typesOfWaste: [],
    openHours: [],
    weekDays: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'],

    dirty: false,
    dirtyConfirmationOpened: false,
    dirtyConsent: false,
    dirtyNextLocation: null
  }

  componentDidMount () {
    this.unblock = this.props.history.block((nextLocation) => {
      if (this.state.dirty && !this.state.dirtyConsent) {
        this.setState({ dirtyConfirmationOpened: true, dirtyNextLocation: nextLocation })
        return false
      }
    })
  }

  handleDirtyRelease = (confirmation) => {
    const nextLocation = this.state.dirtyNextLocation
    this.setState({ dirtyConsent: confirmation, dirtyConfirmationOpened: false, dirtyNextLocation: null })
    if (confirmation) {
      this.unblock()
      if (nextLocation) {
        this.props.history.push(nextLocation.pathname)
      }
    }
  }

  componentWillReceiveProps ({ location, match, FacilityDetailsQuery, TypesOfWasteListQuery }) {
    let typesOfWaste = []

    if (match.params.facilityId) {
      if (FacilityDetailsQuery && FacilityDetailsQuery.facility) {
        const {
          _id,
          name,
          telephone,
          website,
          location: {
            address,
            municipality,
            state,
            zip
          },
          typesOfWaste: currentTypesOfWaste,
          openHours
        } = FacilityDetailsQuery.facility

        const totalOpenHours = this.state.weekDays.map((d) => {
          const open = openHours.find((it) => it.dayOfWeek === d)
          if (open) return { dayOfWeek: d, startTime: open.startTime, endTime: open.startTime }
          return { dayOfWeek: d, startTime: '', endTime: '' }
        })

        this.setState({
          _id,
          name,
          telephone,
          website,
          address,
          municipality,
          state,
          zip,
          openHours: totalOpenHours,
          dirty: false,
          dirtyConsent: false,
          dirtyConfirmationOpened: false,
          dirtyNextLocation: null
        })

        typesOfWaste = currentTypesOfWaste.map(({ _id }) => _id)
      }
    } else {
      if (location.search) {
        const search = qs.parse(location.search)
        if (search.type) {
          typesOfWaste = search.type instanceof Array ? search.type : [search.type]
        }
      }

      this.setState({
        _id: null,
        name: '',
        telephone: '',
        website: '',
        address: '',
        municipality: '',
        state: '',
        zip: '',
        openHours: generateEmptyCalendar(),
        dirty: false,
        dirtyConsent: false,
        dirtyConfirmationOpened: false,
        dirtyNextLocation: null
      })
    }

    if (!TypesOfWasteListQuery.loading) {
      const { typesOfWaste: validTypesOfWaste } = TypesOfWasteListQuery
      const validTypesOfWasteIds = validTypesOfWaste.map(({ _id }) => _id)
      const sanatizedTypesOfWaste = typesOfWaste.filter(type => validTypesOfWasteIds.indexOf(type) > -1)
      this.setState({ typesOfWaste: sanatizedTypesOfWaste })
    }
  }

  handleChange = name => event => {
    const path = name.split('.')

    if (path.length > 1) {
      const newState = this.state[path[0]]
      let current = newState
      for (const p of path.slice(1, -1)) {
        current = current[p]
      }
      current[path.pop()] = event.target.value
      this.setState(newState)
    } else {
      this.setState({ [path[0]]: event.target.value })
    }
    this.setState({ dirty: true, dirtyConsent: false })
  }

  handleTypeOfWasteDelete = type => event => {
    const typesOfWaste = [...this.state.typesOfWaste]
    const typeToDelete = typesOfWaste.indexOf(type)
    typesOfWaste.splice(typeToDelete, 1)
    this.setState({ typesOfWaste })
  }

  async onSubmit (e) {
    e.preventDefault()

    const { _id, name, telephone, website, address, municipality, zip, state, typesOfWaste, openHours } = this.state

    const cleanOpenHours = openHours.filter(
      o => o.startTime.match(/[0-2][0-9]:[0-5][0-9]/) && o.endTime.match(/[0-2][0-9]:[0-5][0-9]/)
    )

    const variables = { name, telephone, website, address, municipality, zip, state, typesOfWaste, openHours: cleanOpenHours }

    if (this.state._id) {
      const { data } = await this.props.FacilityEditMutation({ variables: { id: _id, ...variables } })
      if (data.updateFacility) {
        const { facility } = data.updateFacility
        this.props.history.push(`/facilities/view/${facility._id}`)
      }
    } else {
      const { data } = await this.props.FacilityAddMutation({ variables })
      if (data.addFacility) {
        const { facility } = data.addFacility
        this.props.history.push(`/facilities/view/${facility._id}`)
      }
    }
  }

  render () {
    const { auth: { roles } } = this.context
    if (roles.indexOf('ADMIN') === -1 && roles.indexOf('MAINTAINER') === -1) {
      return (<Unauthorized />)
    }

    const { loading: loading1, error: error1, typesOfWaste } = this.props.TypesOfWasteListQuery
    const { loading: loading2, error: error2, facility } = this.props.FacilityDetailsQuery || {}
    const { classes, match } = this.props

    const isNew = !match.params.facilityId

    if (loading1 || loading2) {
      return <Loading />
    }

    if (error1 || error2) {
      return <p>{ (error1 || error2).message }</p>
    }

    if (!isNew && facility === null) {
      return <NotFound />
    }

    const typesOfWasteMap = {}
    for (const type of typesOfWaste) {
      typesOfWasteMap[type._id] = type
    }

    const ptWeekDays = {
      MONDAY: 'Segunda-feira',
      TUESDAY: 'Terça-feira',
      WEDNESDAY: 'Quarta-feira',
      THURSDAY: 'Quinta-feira',
      FRIDAY: 'Sexta-feira',
      SATURDAY: 'Sábado',
      SUNDAY: 'Domingo'
    }

    return (
      <div>
        <ConfirmDialog
          title='Modificações não salvas'
          opened={this.state.dirtyConfirmationOpened}
          onConfirm={() => this.handleDirtyRelease(true)}
          onCancel={() => this.handleDirtyRelease(false)}
        >
          <p>Você deseja sair da página sem salvar as suas modificações?</p>
        </ConfirmDialog>

        <Button variant='fab' mini color='secondary' component={Link} to={`/facilities/`} className={classes.cancel}>
          <ContentClear />
        </Button>

        <Typography variant='title'>
          { isNew ? 'Novo Ponto de Coleta' : 'Editar Ponto de Coleta' }
        </Typography>

        <FormControl component='fieldset'>
          <form onSubmit={this.onSubmit.bind(this)}>
            <TextField
              label='Nome'
              value={this.state.name}
              onChange={this.handleChange('name')}
              fullWidth
              className={classes.field}
            />
            <TextField
              label='Contato'
              value={this.state.telephone}
              onChange={this.handleChange('telephone')}
              fullWidth
              className={classes.field}
            />
            <TextField
              label='Website'
              value={this.state.website}
              onChange={this.handleChange('website')}
              fullWidth
              className={classes.field}
            />
            <TextField
              label='Endereço'
              value={this.state.address}
              onChange={this.handleChange('address')}
              fullWidth
              className={classes.field}
            />

            <TextField
              label='Cidade'
              value={this.state.municipality}
              onChange={this.handleChange('municipality')}
              fullWidth
              className={classes.field}
            />

            <TextField
              label='Estado'
              value={this.state.state}
              onChange={this.handleChange('state')}
              fullWidth
              className={classes.field}
            />

            <TextField
              label='CEP'
              value={this.state.zip}
              onChange={this.handleChange('zip')}
              fullWidth
              className={classes.field}
            />

            <FormControl fullWidth className={classes.field}>
              <InputLabel>Tipos de Lixo</InputLabel>
              <Select
                multiple
                value={this.state.typesOfWaste}
                onChange={this.handleChange('typesOfWaste')}
                input={<Input />}
                renderValue={selected => (
                  <div className={classes.typesOfWaste} style={{
                    display: 'flex',
                    flexWrap: 'wrap'
                  }}>
                    {selected.map(value =>
                      <Chip
                        key={value}
                        avatar={<Avatar src={typesOfWasteMap[value].icons.androidMediumURL} />}
                        label={typesOfWasteMap[value].name}
                        style={{ margin: 5 }}
                        onDelete={this.handleTypeOfWasteDelete(value)}
                      />
                    )}
                  </div>
                )}
              >
                {typesOfWaste.map(({ _id, name }) => (
                  <MenuItem
                    key={name}
                    value={_id}>
                    <ListItemIcon>
                      <Avatar src={typesOfWasteMap[_id].icons.androidMediumURL} />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Paper className={classes.field}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Dia da semana</TableCell>
                    <TableCell colSpan={2}>Horário</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.openHours.map((it, i) => {
                    return (
                      <TableRow key={it.dayOfWeek}>
                        <TableCell variant='head'>{ptWeekDays[it.dayOfWeek]}</TableCell>
                        <TableCell>
                          <TextField
                            label='Abertura'
                            type='time'
                            onChange={this.handleChange(`openHours.${i}.startTime`)}
                            defaultValue={it.startTime}
                            InputLabelProps={{
                              shrink: true
                            }}
                            inputProps={{
                              step: 10 * 60
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            label='Fechamento'
                            type='time'
                            onChange={this.handleChange(`openHours.${i}.endTime`)}
                            defaultValue={it.endTime}
                            InputLabelProps={{
                              shrink: true
                            }}
                            inputProps={{
                              step: 10 * 60
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Paper>

            <Button variant='raised' color='primary' type='submit' className={classes.field}>
              { isNew ? 'Criar' : 'Editar' }
            </Button>

          </form>
        </FormControl>
      </div>
    )
  }
}

export const FacilityDetailsQuery = gql`
  query FacilityDetailsQuery($facilityId: ID!) {
    facility(_id: $facilityId) {

      ...FacilityFieldsFragment

      typesOfWaste {
        _id
        name
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

export const FacilityAddMutation = gql`
  mutation AddFacility (
    $name: String!,
    $telephone: String!,
    $website: String!,
    $address: String!,
    $municipality: String!,
    $state: String!,
    $zip: String!,
    $typesOfWaste: [ID]!,
    $openHours: [OpenTimeInput]!
  ) {
    addFacility(
      input: {
        name: $name,
        telephone: $telephone,
        website: $website,
        location: {
          address: $address,
          municipality: $municipality,
          state: $state,
          zip: $zip
        },
        typesOfWaste: $typesOfWaste,
        openHours: $openHours
      }
    ) {
      success
      facility {
        ...FacilityFieldsFragment
      }
    }
  }

  ${FacilityFieldsFragment}
`

export const FacilityEditMutation = gql`
  mutation EditFacility (
    $id: ID!,
    $name: String!,
    $telephone: String!,
    $website: String!,
    $address: String!,
    $municipality: String!,
    $state: String!,
    $zip: String!,
    $typesOfWaste: [ID]!,
    $openHours: [OpenTimeInput]!
  ) {
    updateFacility (
      input: {
        _id: $id,
        patch: {
          name: $name,
          telephone: $telephone,
          website: $website,
          location: {
            address: $address,
            municipality: $municipality,
            state: $state,
            zip: $zip
          },
          typesOfWaste: $typesOfWaste,
          openHours: $openHours
        }
      }
    ) {
      success
      facility {
        ...FacilityFieldsFragment
      }
    }
  }

  ${FacilityFieldsFragment}
`

export const TypesOfWasteListQuery = gql`
  query TypesOfWasteListQuery {
    typesOfWaste {
      _id
      name
      icons {
        androidMediumURL
      }
    }
  }
`

export default compose(
  withStyles(FacilityEditor.styles, { withTheme: true }),
  graphql(TypesOfWasteListQuery, { name: 'TypesOfWasteListQuery' }),
  graphql(FacilityDetailsQuery, {
    name: 'FacilityDetailsQuery',
    skip: (props) => !props.match.params.facilityId,
    options: (props) => ({
      variables: { facilityId: props.match.params.facilityId }
    })
  }),
  graphql(FacilityAddMutation, {
    name: 'FacilityAddMutation',
    options: {
      refetchQueries: [FacilityListQuery.name]
    }
  }),
  graphql(FacilityEditMutation, {
    name: 'FacilityEditMutation'
  })
)(FacilityEditor)
