import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { gql, graphql, compose } from 'react-apollo'

import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import EditIcon from 'material-ui-icons/Edit'

import NotFound from '../NotFound'
import Loading from '../Loading'

class UserDetails extends Component {
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
    const { classes, data: { loading, error, user } } = this.props

    if (loading) {
      return <Loading />
    }

    if (error) {
      return <p>{ error.message }</p>
    }

    if (user === null) {
      return <NotFound />
    }

    const roles = {
      ADMIN: 'Administrador',
      MAINTAINER: 'Bibliotecário',
      CONSUMER: 'Somente leitura',
    }

    return (
      <div>
        <Button variant='fab' mini color='secondary' component={Link} to={`/users/edit/${user._id}`} className={classes.edit}>
          <EditIcon />
        </Button>

        <Typography variant='title'>
          {user.name}
        </Typography>

        <p>E-mail: {user.email}</p>
        <p>Papéis: {user.roles.map(it => roles[it]).join(', ')}</p>
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

export default compose(
  withStyles(UserDetails.styles, { withTheme: true }),
  graphql(userDetailsQuery, {
    options: (props) => ({
      fetchPolicy: 'network-only',
      variables: { userId: props.match.params.userId }
    })
  })
)(UserDetails)
