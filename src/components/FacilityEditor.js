import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import { gql, graphql, compose } from 'react-apollo';
import { withStyles } from 'material-ui/styles';

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Select from 'material-ui/Select';

import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar'
import { CircularProgress } from 'material-ui/Progress'

class FacilityEditor extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  }

  static styles = theme => ({
    paper: {
      padding: 16,
    },
    typesOfWaste: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    field: {
      marginTop: 16, 
    }
  })
  
  state = {
    name: 'sdfsdf',
    address: 'Rua Pedro de Carvalho 89',
    municipality: 'Rio de Janeiro',
    state: 'Rio de Janeiro',
    zip: '25250525',
    typeOfWaste: []
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleTypeOfWasteDelete = type => event => {
    const typeOfWaste = [...this.state.typeOfWaste];
    const typeToDelete = typeOfWaste.indexOf(type);
    typeOfWaste.splice(typeToDelete, 1);
    this.setState({ typeOfWaste });
  }

  async onSubmit(e) {
    e.preventDefault()

    const { name, address, municipality, zip, state, typeOfWaste } = this.state;
    const { data } = await this.props.facilityCreationMutation({
      variables: {
        name,
        address,
        municipality,
        zip,
        state,
        typeOfWaste
      },
    })

    if (data.addFacility) {
      const { facility } = data.addFacility
      this.props.history.push(`/facilities/view/${facility._id}`)
    }
  }

  render() {
    const { loading, error, typesOfWaste } = this.props.typeOfWasteListQuery
    const { classes, theme } = this.props

    if (loading) {
      return <div style={{ textAlign: 'center' }}><CircularProgress size={50} /></div>
    }
  
    if (error) {
      return <p>{ error.message }</p>
    }

    const typesOfWasteMap = {}
    for (const type of typesOfWaste) {
      typesOfWasteMap[type._id] = type
    }

    return (
      <div>
        <Typography type='title'>
          Novo Ponto de Coleta
        </Typography>

        <form onSubmit={this.onSubmit.bind(this)}>
          <TextField
            label="Nome"
            value={this.state.name}
            onChange={this.handleChange('name')}
            fullWidth
            className={classes.field}
          />

          <TextField
            label="Endereço"
            value={this.state.address}
            onChange={this.handleChange('address')}
            fullWidth
            className={classes.field}
          />

          <TextField
            label="Cidade"
            value={this.state.municipality}
            onChange={this.handleChange('municipality')}
            fullWidth
            className={classes.field}
          />

          <TextField
            label="Estado"
            value={this.state.state}
            onChange={this.handleChange('state')}
            fullWidth
            className={classes.field}
          />

          <TextField
            label="CEP"
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
                  flexWrap: 'wrap',
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
              // MenuProps={MenuProps}
            >
              {typesOfWaste.map(({_id, name}) => (
                <MenuItem
                  key={name}
                  value={_id}
                  style={{
                    fontWeight:
                      this.state.name.indexOf(name) === -1
                        ? theme.typography.fontWeightRegular
                        : theme.typography.fontWeightMedium,
                  }}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button raised color="primary" type='submit' className={classes.field}>
            Criar
          </Button>
        </form>
      </div>
    )
  }
}

const facilityCreationMutation = gql`
  mutation AddFacility(
    $name: String!,
    $address: String!,
    $municipality: String!,
    $state: String!,
    $zip: String!,
    $typeOfWaste: [ID]!
  ) {
    addFacility(input: {
      name: $name,
      location: {
        address: $address,
        municipality: $municipality,
        state: $state,
        zip: $zip
      },
      typesOfWaste: $typeOfWaste
    }) {
      success
      facility {
        _id
        name
      }
    }
  }
`

const typeOfWasteListQuery = gql`
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
  graphql(typeOfWasteListQuery, {name: 'typeOfWasteListQuery'}),
  graphql(facilityCreationMutation, {name: 'facilityCreationMutation'}),
)(FacilityEditor)