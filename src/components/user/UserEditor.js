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

import { UserFieldsFragment, UserListQuery } from './UserListing'

class UserEditor extends Component {
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
    title: '',
    organization: '',
    municipality: '',
    password: '',
    roles: []
  }

  componentWillReceiveProps ({ match, UserDetailsQuery }) {
    if (match.params.userId) {
      if (UserDetailsQuery && UserDetailsQuery.user) {
        const {
          _id,
          name,
          title,
          organization,
          municipality,
          email,
          roles
        } = UserDetailsQuery.user

        this.setState({
          _id,
          name,
          title,
          organization,
          municipality,
          email,
          password: '',
          roles
        })
      }
    } else {
      this.setState({
        _id: null,
        name: '',
        title: '',
        organization: '',
        municipality: '',
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

    const { _id, name, email, title, organization, municipality, password, roles } = this.state
    const variables = { name, email, title, organization, municipality, password, roles }

    if (this.state._id) {
      const { data } = await this.props.UserEditMutation({ variables: { id: _id, ...variables } })
      if (data.updateUser) {
        const { user } = data.updateUser
        this.props.history.push(`/users/view/${user._id}`)
      }
    } else {
      const { data } = await this.props.UserAddMutation({ variables })
      if (data.addUser) {
        const { user } = data.addUser
        this.props.history.push(`/users/view/${user._id}`)
      }
    }
  }

  render () {
    const { classes, match } = this.props
    const { auth } = this.context
    const { loading, error, user } = this.props.UserDetailsQuery || {}

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
      { _id: 'USER', name: 'Somente leitura' }
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
            label='Cargo'
            value={this.state.title}
            onChange={this.handleChange('title')}
            fullWidth
            className={classes.field}
          />

          <TextField
            label='Organização / Biblioteca'
            value={this.state.organization}
            onChange={this.handleChange('organization')}
            fullWidth
            className={classes.field}
          />

          <TextField
            label='Município'
            value={this.state.municipality}
            onChange={this.handleChange('municipality')}
            fullWidth
            className={classes.field}
          />

          <TextField
            label='Senha'
            type='password'
            autoComplete='off'
            value={this.state.password}
            onChange={this.handleChange('password')}
            fullWidth
            className={classes.field}
          />

          {
            // If the logged user is an admin, the user can change the role
            auth.roles.includes('ADMIN') ? (

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

            ) : null }

          <Button variant='raised' color='primary' type='submit' className={classes.field}>
            { isNew ? 'Criar' : 'Editar' }
          </Button>
        </form>
      </div>
    )
  }
}

export const UserDetailsQuery = gql`
  query UserDetailsQuery($userId: ID!) {
    user(_id: $userId) {
      ...UserFieldsFragment
    }
  }

  ${UserFieldsFragment}
`

export const UserAddMutation = gql`
  mutation UserAddMutation (
    $name: String!,
    $email: String!,
    $title: String!,
    $organization: String!,
    $municipality: String!,
    $password: String!,
    $roles: [Role]!
  ) {
    addUser(
      input: {
        name: $name,
        email: $email,
        title: $title,
        organization: $organization,
        municipality: $municipality,
        password: $password,
        roles: $roles
      }
    ) {
      success
      user {
        ...UserFieldsFragment
      }
    }
  }

  ${UserFieldsFragment}
`

export const UserEditMutation = gql`
  mutation UserEditMutation (
    $id: ID!
    $name: String,
    $email: String,
    $title: String!,
    $organization: String!,
    $municipality: String!,
    $password: String,
    $roles: [Role]
  ) {
    updateUser (
      input: {
        _id: $id,
        patch: {
          name: $name,
          email: $email,
          title: $title,
          organization: $organization,
          municipality: $municipality,
          password: $password,
          roles: $roles
        }
      }
    ) {
      success
      user {
        ...UserFieldsFragment
      }
    }
  }

  ${UserFieldsFragment}
`

export default compose(
  withStyles(UserEditor.styles, { withTheme: true }),
  graphql(UserDetailsQuery, {
    name: 'UserDetailsQuery',
    skip: (props) => !props.match.params.userId,
    options: (props) => ({
      variables: { userId: props.match.params.userId }
    })
  }),
  graphql(UserAddMutation, {
    name: 'UserAddMutation',
    options: {
      refetchQueries: [UserListQuery.name]
    }
  }),
  graphql(UserEditMutation, {
    name: 'UserEditMutation'
  })
)(UserEditor)
