import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { CircularProgress } from 'material-ui/Progress'
import Checkbox from 'material-ui/Checkbox';

class FacilityListing extends Component {
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

  render() {
    const { data: { loading, error, facilities } } = this.props

    if (loading) {
      return <div style={{ textAlign: 'center' }}><CircularProgress size={50} /></div>
    }

    if (error) {
      return <p>{ error.message }</p>
    }

    return (
      <List>
        { facilities.items.map(it => (
        <Link to={`/facilities/${it._id}`}>
        <ListItem key={it._id}>
          <Checkbox
            checked={!!this.state.checked[it._id]}
            onClick={this.selectFacility(it._id)}
            tabIndex={-1}
            disableRipple
          />
            <ListItemText primary={it.name} secondary={`${it.location.address}, ${it.location.municipality} ${it.location.state} ${it.location.zip}`} />
        </ListItem>
        </Link>
        ))}
      </List>
    )
  }
}

const facilityListQuery = gql`
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

export default graphql(facilityListQuery)(FacilityListing)
