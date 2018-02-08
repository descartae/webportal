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

class FacilityListing extends Component {
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
    this.props.data.prevPage()
  };

  handleNext = () => {
    if (this.props.loading) return
    this.props.data.nextPage()
  };

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
    const { classes, data: { loading, error, facilities } } = this.props

    if (loading) {
      return <Loading />
    }

    if (error) {
      return <p>{ error.message }</p>
    }

    const { items } = facilities

    return (
      <div>
        <List component='nav'>
          { items.map(it => (
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

export const facilityListQuery = gql`
  query FacilityListQuery($before: Cursor, $after: Cursor, $quantity: Int!) {
    facilities(filters: {
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

export default compose(
  withStyles(FacilityListing.styles, { withTheme: true }),
  graphql(facilityListQuery, {
    options: (props) => ({
      fetchPolicy: 'network-only',
      variables: {
        quantity: props.pageSize
      }
    }),
    props: ({
      data: {
        variables,
        facilities,
        fetchMore,
        ...dataRest
      },
      ...rest
    }) => ({

      ...rest,

      data: {
        ...dataRest,

        variables,
        facilities,
        fetchMore,

        prevPage: () =>
          fetchMore({
            query: facilityListQuery,
            variables: {
              ...variables,
              before: facilities.cursors.before
            },
            updateQuery: (
              { facilities: oldFacilities },
              { fetchMoreResult: { facilities } }
            ) => ({
              facilities:
                  facilities.items.length > 0
                    ? facilities
                    : oldFacilities
            })
          }),

        nextPage: () =>
          fetchMore({
            query: facilityListQuery,
            variables: {
              ...variables,
              after: facilities.cursors.after
            },
            updateQuery: (
              { facilities: oldFacilities },
              { fetchMoreResult: { facilities } }
            ) => ({
              facilities:
                  facilities.items.length > 0
                    ? facilities
                    : oldFacilities
            })
          })
      }
    })
  })
)(FacilityListing)
