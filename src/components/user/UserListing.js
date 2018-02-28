import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { gql, graphql, compose } from 'react-apollo'

import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import Button from 'material-ui/Button'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'

import Loading from '../Loading'

class UserListing extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  static styles = theme => ({
    prev: { float: 'left' },
    next: { float: 'right' }
  })

  state = {
    checked: {}
  }

  handlePrev = () => {
    if (this.props.loading) return
    this.props.UserListQuery.prevPage()
  };

  handleNext = () => {
    if (this.props.loading) return
    this.props.UserListQuery.nextPage()
  };

  selectUser = (id) => (e) => {
    e.preventDefault()

    const state = this.state.checked
    state[id] = !state[id]
    if (!state[id]) {
      delete state[id]
    }
    this.setState({ checked: state })
  }

  render () {
    const { classes, UserListQuery: { loading, error, users } } = this.props

    if (loading) {
      return <Loading />
    }

    if (error) {
      return <p>{ error.message }</p>
    }

    const { items } = users

    return (
      <div>
        <List component='nav'>
          { items.map(it => (
            <ListItem button component={Link} to={`/users/view/${it._id}`} key={it._id}>
              <Checkbox
                checked={!!this.state.checked[it._id]}
                onClick={this.selectUser(it._id)}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={it.name} secondary={`${it.email}`} />
            </ListItem>
          ))}
        </List>

        <div>
          <Button size='small' className={classes.prev} onClick={this.handlePrev}>
            <KeyboardArrowLeft />
          </Button>

          <Button size='small' className={classes.next} onClick={this.handleNext}>
            <KeyboardArrowRight />
          </Button>
        </div>
      </div>
    )
  }
}

export const UserFieldsFragment = gql`
  fragment UserFieldsFragment on User {
    _id
    name
    email
    roles
  }
`

export const UserListQuery = gql`
  query UserListQuery($before: Cursor, $after: Cursor, $quantity: Int!) {
    users(filters: {
      hasRole: true
      cursor: {
        after: $after
        before: $before
        quantity: $quantity
      }
    }) {
      cursors {
        after
        before
      }

      items {
        ...UserFieldsFragment
      }
    }
  }

  ${UserFieldsFragment}
`
UserListQuery.name = 'UserListQuery'

export default compose(
  withStyles(UserListing.styles, { withTheme: true }),
  graphql(UserListQuery, {
    name: 'UserListQuery',
    options: (props) => ({
      variables: {
        quantity: props.pageSize
      }
    }),
    props: ({
      UserListQuery: {
        variables,
        users,
        fetchMore,
        ...queryRest
      },
      ...rest
    }) => ({

      ...rest,

      UserListQuery: {
        ...queryRest,

        variables,
        users,
        fetchMore,

        prevPage: () =>
          fetchMore({
            query: UserListQuery,
            variables: {
              ...variables,
              before: users.cursors.before
            },
            updateQuery: (
              { users: oldUsers },
              { fetchMoreResult: { users } }
            ) => ({
              users:
                  users.items.length > 0
                    ? users
                    : oldUsers
            })
          }),

        nextPage: () =>
          fetchMore({
            query: UserListQuery,
            variables: {
              ...variables,
              after: users.cursors.after
            },
            updateQuery: (
              { users: oldUsers },
              { fetchMoreResult: { users } }
            ) => ({
              users:
                  users.items.length > 0
                    ? users
                    : oldUsers
            })
          })
      }
    })
  })
)(UserListing)
