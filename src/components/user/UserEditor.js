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

class UserEditor extends Component {
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
    email: '',
    password: '',
    roles: []
  }

  componentWillReceiveProps ({ match, userDetailsQuery, typeOfWasteListQuery }) {
    if (match.params.userId) {
      if (userDetailsQuery && userDetailsQuery.user) {
        const {
          _id,
          name,
          email,
          roles
        } = userDetailsQuery.user

        this.setState({
          _id,
          name,
          email,
          password: '',
          roles
        })
      }
    } else {
      this.setState({
        _id: null,
        name: '',
        email: '',
        password: '',
        roles: []
      })
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleRoleDelete = type => event => {
    const roles = [...this.state.roles]
    const roleToDelete = roles.indexOf(type)
    roles.splice(roleToDelete, 1)
    this.setState({ roles })
  }

  async onSubmit (e) {
    e.preventDefault()

    const { _id, name, email, password, roles } = this.state
    const variables = { name, email, password, roles }

    if (this.state._id) {
      const { data } = await this.props.userEditMutation({ variables: { id: _id, ...variables } })
      if (data.updateUser) {
        const { user } = data.updateUser
        this.props.history.push(`/users/view/${user._id}`)
      }
    } else {
      const { data } = await this.props.userAddMutation({ variables })
      if (data.addUser) {
        const { user } = data.addUser
        this.props.history.push(`/users/view/${user._id}`)
      }
    }
  }

  render () {
    const { classes, match } = this.props
    const { loading, error, user } = this.props.userDetailsQuery || {}

    const isNew = !match.params.userId

    if (loading) {
      return <Loading />
    }

    if (error) {
      return <p>{ error.message }</p>
    }

    if (!isNew && user === null) {
      return <NotFound />
    }

    const roles = [
      { _id: 'ADMIN', name: 'Administrador' },
      { _id: 'MAINTAINER', name: 'Bibliotecário' },
      { _id: 'CONSUMER', name: 'Somente leitura' }
    ]

    const rolesMap = {}
    for (const role of roles) {
      rolesMap[role._id] = role
    }

    return (
      <div>
        <Typography variant='title'>
          { isNew ? 'Novo Usuário' : 'Editar Usuário' }
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
            label='E-mail'
            value={this.state.email}
            onChange={this.handleChange('email')}
            fullWidth
            className={classes.field}
          />

          <TextField
            label='Senha'
            type='password'
            value={this.state.password}
            onChange={this.handleChange('password')}
            fullWidth
            className={classes.field}
          />

          <FormControl fullWidth className={classes.field}>
            <InputLabel>Papéis</InputLabel>
            <Select
              multiple
              value={this.state.roles}
              onChange={this.handleChange('roles')}
              input={<Input />}
              renderValue={selected => (
                <div className={classes.roles} style={{
                  display: 'flex',
                  flexWrap: 'wrap'
                }}>
                  {selected.map(_id =>
                    <Chip
                      key={_id}
                      avatar={<Avatar src={rolesMap[_id].icon} />}
                      label={rolesMap[_id].name}
                      style={{ margin: 5 }}
                      onDelete={this.handleRoleDelete(_id)}
                    />
                  )}
                </div>
              )}
            >
              {roles.map(({ _id, name }) => (
                <MenuItem
                  key={name}
                  value={_id}>
                  <ListItemIcon>
                    <Avatar src={rolesMap[_id].icon} />
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

export const userDetailsQuery = gql`
  query UserDetailsQuery($userId: ID!) {
    user(_id: $userId) {
      _id
      name
      email
      roles
    }
  }
`

export const userAddMutation = gql`
  mutation AddUser (
    $name: String!,
    $email: String!,
    $password: String!,
    $roles: [Role]!
  ) {
    addUser(
      input: {
        name: $name,
        email: $email,
        password: $password,
        roles: $roles
      }
    ) {
      success
      user {
        _id
        name
        email
        roles
      }
    }
  }
`

export const userEditMutation = gql`
  mutation EditUser (
    $id: ID!
    $name: String,
    $email: String,
    $password: String,
    $roles: [Role]
  ) {
    updateUser (
      input: {
        _id: $id,
        patch: {
          name: $name,
          email: $email,
          password: $password,
          roles: $roles
        }
      }
    ) {
      success
      user {
        _id
        name
        email
        roles
      }
    }
  }
`

export default compose(
  withStyles(UserEditor.styles, { withTheme: true }),
  graphql(userDetailsQuery, {
    name: 'userDetailsQuery',
    skip: (props) => !props.match.params.userId,
    options: (props) => ({
      variables: { userId: props.match.params.userId }
    })
  }),
  graphql(userAddMutation, {
    name: 'userAddMutation'
  }),
  graphql(userEditMutation, {
    name: 'userEditMutation'
  })
)(UserEditor)
