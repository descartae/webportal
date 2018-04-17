import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { gql, graphql, compose } from 'react-apollo'

import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import Button from 'material-ui/Button'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import FeedbackIcon from 'material-ui-icons/Feedback'
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

  state = { }

  handlePrev = () => {
    if (this.props.loading) return
    this.props.FacilityListQuery.prevPage()
  };

  handleNext = () => {
    if (this.props.loading) return
    this.props.FacilityListQuery.nextPage()
  };

  render () {
    const {
      classes,
      FacilityListQuery: { loading, error, facilities }
    } = this.props

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
              <ListItemText primary={it.name} secondary={`
                ${it.location.address}, ${it.location.municipality}
                ${it.location.state} ${it.location.zip}
              `} />

              <ListItemSecondaryAction>
                <IconButton component={Link} to={`/facilities/view/${it._id}/feedbacks`}>
                  {it.feedbacks.unresolved > 0 ? (
                    <Badge badgeContent={it.feedbacks.unresolved} color='primary'>
                      <FeedbackIcon />
                    </Badge>
                  ) : (
                    <FeedbackIcon />
                  )}
                </IconButton>
              </ListItemSecondaryAction>
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

export const FacilityFieldsFragment = gql`
  fragment FacilityFieldsFragment on Facility {
    _id
    name
    telephone
    website
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

    feedbacks {
      unresolved
    }
  }
`

export const FacilityListQuery = gql`
  query FacilityListQuery ($before: Cursor, $after: Cursor, $quantity: Int!) {
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
        ...FacilityFieldsFragment
      }
    }
  }

  ${FacilityFieldsFragment}
`
FacilityListQuery.name = 'FacilityListQuery'

export default compose(
  withStyles(FacilityListing.styles, { withTheme: true }),
  graphql(FacilityListQuery, {
    name: 'FacilityListQuery',
    options: (props) => ({
      variables: {
        quantity: props.pageSize
      }
    }),
    props: ({
      FacilityListQuery: {
        variables,
        facilities,
        fetchMore,
        ...queryRest
      },
      ...rest
    }) => ({
      ...rest,

      FacilityListQuery: {
        ...queryRest,

        variables,
        facilities,
        fetchMore,

        prevPage: () =>
          fetchMore({
            query: FacilityListQuery,
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
            query: FacilityListQuery,
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
