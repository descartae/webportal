import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { gql, graphql, compose } from 'react-apollo'
import { withStyles } from 'material-ui/styles'

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Select from 'material-ui/Select'

import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { ListItemIcon, ListItemText } from 'material-ui/List'
import { FormControl } from 'material-ui/Form'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'

import NotFound from '../NotFound'
import Loading from '../Loading'

class FacilityEditor extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  static styles = theme => ({
    paper: {
      padding: 16
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
    address: '',
    municipality: '',
    state: '',
    zip: '',
    typeOfWaste: []
  }

  componentWillReceiveProps ({ match, facilityDetailsQuery, typeOfWasteListQuery }) {
    if (match.params.facilityId) {
      if (facilityDetailsQuery && facilityDetailsQuery.facility) {
        const {
          _id,
          name,
          location: {
            address,
            municipality,
            state,
            zip
          },
          typesOfWaste
        } = facilityDetailsQuery.facility

        this.setState({
          _id,
          name,
          address,
          municipality,
          state,
          zip,
          typeOfWaste: typesOfWaste.map(({ _id }) => _id)
        })
      }
    } else {
      this.setState({
        _id: null,
        name: '',
        address: '',
        municipality: '',
        state: '',
        zip: '',
        typeOfWaste: []
      })
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleTypeOfWasteDelete = type => event => {
    const typeOfWaste = [...this.state.typeOfWaste]
    const typeToDelete = typeOfWaste.indexOf(type)
    typeOfWaste.splice(typeToDelete, 1)
    this.setState({ typeOfWaste })
  }

  async onSubmit (e) {
    e.preventDefault()

    const { _id, name, address, municipality, zip, state, typeOfWaste } = this.state
    const variables = { name, address, municipality, zip, state, typeOfWaste }

    if (this.state._id) {
      const { data } = await this.props.facilityEditMutation({ variables: { id: _id, ...variables } })
      if (data.updateFacility) {
        const { facility } = data.updateFacility
        this.props.history.push(`/facilities/view/${facility._id}`)
      }
    } else {
      const { data } = await this.props.facilityAddMutation({ variables })
      if (data.addFacility) {
        const { facility } = data.addFacility
        this.props.history.push(`/facilities/view/${facility._id}`)
      }
    }
  }

  render () {
    const { loading: loading1, error: error1, typesOfWaste } = this.props.typeOfWasteListQuery
    const { loading: loading2, error: error2, facility } = this.props.facilityDetailsQuery || {}
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

    return (
      <div>
        <Typography variant='title'>
          { isNew ? 'Novo Ponto de Coleta' : 'Editar Ponto de Coleta' }
        </Typography>

        <form onSubmit={this.onSubmit.bind(this)}>
          <TextField
            label='Nome'
            value={this.state.name}
            onChange={this.handleChange('name')}
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
              value={this.state.typeOfWaste}
              onChange={this.handleChange('typeOfWaste')}
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

          <Button variant='raised' color='primary' type='submit' className={classes.field}>
            { isNew ? 'Criar' : 'Editar' }
          </Button>
        </form>
      </div>
    )
  }
}

export const facilityDetailsQuery = gql`
  query FacilityDetailsQuery($facilityId: ID!) {
    facility(_id: $facilityId) {
      _id
      name
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
      }
      openHours {
        dayOfWeek
        startTime
        endTime
      }
    }
  }
`

export const facilityAddMutation = gql`
  mutation AddFacility (
    $name: String!,
    $address: String!,
    $municipality: String!,
    $state: String!,
    $zip: String!,
    $typeOfWaste: [ID]!
  ) {
    addFacility(
      input: {
        name: $name,
        location: {
          address: $address,
          municipality: $municipality,
          state: $state,
          zip: $zip
        },
        typesOfWaste: $typeOfWaste
      }
    ) {
      success
      facility {
        _id
        name
      }
    }
  }
`

export const facilityEditMutation = gql`
  mutation EditFacility (
    $id: ID!
    $name: String!,
    $address: String!,
    $municipality: String!,
    $state: String!,
    $zip: String!,
    $typeOfWaste: [ID]!
  ) {
    updateFacility (
      input: {
        _id: $id,
        patch: {
          name: $name,
          location: {
            address: $address,
            municipality: $municipality,
            state: $state,
            zip: $zip
          },
          typesOfWaste: $typeOfWaste
        }
      }
    ) {
      success
      facility {
        _id
      }
    }
  }
`

export const typeOfWasteListQuery = gql`
  query TypeOfWasteListQuery {
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
  graphql(typeOfWasteListQuery, { name: 'typeOfWasteListQuery' }),
  graphql(facilityDetailsQuery, {
    name: 'facilityDetailsQuery',
    skip: (props) => !props.match.params.facilityId,
    options: (props) => ({
      variables: { facilityId: props.match.params.facilityId }
    })
  }),
  graphql(facilityAddMutation, {
    name: 'facilityAddMutation'
  }),
  graphql(facilityEditMutation, {
    name: 'facilityEditMutation'
  })
)(FacilityEditor)
