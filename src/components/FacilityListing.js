import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { gql, graphql, compose } from 'react-apollo'

import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import MobileStepper from 'material-ui/MobileStepper';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

import Loading from './Loading'

class FacilityListing extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    pageSize: PropTypes.number.isRequired
  }

  static styles = theme => ({
  })

  state = {
    checked: {},
    step: 0
  }

  handlePrev = () => {
    if (this.props.loading) return
    this.setState({
      step: Math.max(this.state.step - 1, 0),
    })
    this.props.data.prevPage()
  };

  handleNext = () => {
    if (this.props.loading) return
    const { data: { facilities: { cursors: { count } } }, pageSize } = this.props
    this.setState({
      step: Math.min(
        this.state.step + 1,
        Math.ceil(count / pageSize) - 1
      ),
    });
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
    const { data: { loading, error, facilities }, pageSize } = this.props

    if (loading) {
      return <Loading />
    }

    if (error) {
      return <p>{ error.message }</p>
    }

    const { items, cursors } = facilities

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

        <MobileStepper
          type="dots"
          steps={Math.ceil(cursors.count / pageSize)}
          position="static"
          activeStep={this.state.step}
          backButton={
            <Button size="small" onClick={this.handlePrev}>
              <KeyboardArrowLeft />
            </Button>
          }
          nextButton={
            <Button size="small" onClick={this.handleNext}>
              <KeyboardArrowRight />
            </Button>
          }
        />
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
        count
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
                before: facilities.cursors.before,
              },
              updateQuery: (
                { facilities: oldFacilities },
                { fetchMoreResult: { facilities } }
              ) => ({
                facilities:
                  facilities.items.length > 0 ?
                    facilities :
                    oldFacilities
              })
            }),

          nextPage: () =>
            fetchMore({
              query: facilityListQuery,
              variables: {
                ...variables,
                after: facilities.cursors.after,
              },
              updateQuery: (
                { facilities: oldFacilities },
                { fetchMoreResult: { facilities } }
              ) => ({
                facilities:
                  facilities.items.length > 0 ?
                    facilities :
                    oldFacilities
              })
            })
        }
    })
  })
)(FacilityListing)
