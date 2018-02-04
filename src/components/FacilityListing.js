import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { gql, graphql, compose } from 'react-apollo'

import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { CircularProgress } from 'material-ui/Progress'
import Checkbox from 'material-ui/Checkbox'

class FacilityListing extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  static styles = theme => ({

  })

  state = {
    checked: {}
  }

  selectFacility = (id) => (e) => {
    e.preventDefault()

    const state = this.state.checked
    state[id] = !state[id]
    if (!state[id]) {
      delete state[id]
    }
    this.setState({ checked: state })
  }

  render () {
    const { data: { loading, error, facilities } } = this.props

    if (loading) {
      return <div style={{ textAlign: 'center' }}><CircularProgress size={50} /></div>
    }

    if (error) {
      return <p>{ error.message }</p>
    }

    return (
      <List component='nav'>
        { facilities.items.map(it => (
          <ListItem button component={Link} to={`/facilities/view/${it._id}`} key={it._id}>
            <Checkbox
              checked={!!this.state.checked[it._id]}
              onClick={this.selectFacility(it._id)}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={it.name} secondary={`
              ${it.location.address}, ${it.location.municipality}
              ${it.location.state} ${it.location.zip}
            `} />
          </ListItem>
        ))}
      </List>
    )
  }
}

export const facilityListQuery = gql`
  query FacilityListQuery($after: Cursor, $before: Cursor) {
    facilities(filters: {
      cursor: {
        after: $after
        before: $before
        quantity: 10
      }
    }) {
      cursors {
        after
        before
      }

      items {
        _id
        name
        location {
          address
          municipality
          state
          zip
        }
      }
    }
  }
`
facilityListQuery.name = 'FacilityListQuery'

export default compose(
  withStyles(FacilityListing.styles, { withTheme: true }),
  graphql(facilityListQuery, {
    options: (props) => ({
      fetchPolicy: 'network-only'
    })
  })
)(FacilityListing)
