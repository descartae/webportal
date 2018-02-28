import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { gql, graphql, compose } from 'react-apollo'

import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Button from 'material-ui/Button'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import FeedbackIcon from 'material-ui-icons/Feedback'

import Loading from '../Loading'

class FacilityFeedbackListing extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  static styles = theme => ({
    root: {},
    nav: { textAlign: 'center' },
    contents: { whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }
  })

  state = {
    checked: {}
  }

  handlePrev = () => {
    if (this.props.loading) return
    this.props.FeedbackListQuery.prevPage()
  };

  handleNext = () => {
    if (this.props.loading) return
    this.props.FeedbackListQuery.nextPage()
  };

  selectFeedback = (id) => (e) => {
    e.preventDefault()

    const state = this.state.checked
    state[id] = !state[id]
    if (!state[id]) {
      delete state[id]
    }
    this.setState({ checked: state })
  }

  render () {
    const { classes, match, FeedbackListQuery: { loading, error, feedbacks } } = this.props

    if (loading) {
      return <Loading />
    }

    if (error) {
      return <p>{ error.message }</p>
    }

    const { items } = feedbacks

    return (
      <div>
        <List className={classes.root} component='nav'>
          { items.map(it => (
            <ListItem button component={Link} to={`${match.url}/${it._id}`} key={it._id}>
              {it.resolved ? null : (
                <ListItemIcon>
                  <FeedbackIcon />
                </ListItemIcon>
              )}
              <ListItemText inset classes={{ primary: classes.contents }} primary={it.contents} />
            </ListItem>
          ))}
        </List>

        <div className={classes.nav}>
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

export const FeedbackListQuery = gql`
  query FeedbackListQuery($before: Cursor, $after: Cursor, $quantity: Int!, $facilityId: ID!) {
    feedbacks(filters: {
      facility: $facilityId
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
        resolved
        contents
      }
    }
  }
`

export default compose(
  withStyles(FacilityFeedbackListing.styles, { withTheme: true }),
  graphql(FeedbackListQuery, {
    name: 'FeedbackListQuery',
    options: (props) => ({
      variables: {
        facilityId: props.match.params.facilityId,
        quantity: props.pageSize
      }
    }),
    props: ({
      FeedbackListQuery: {
        variables,
        feedbacks,
        fetchMore,
        ...queryRest
      },
      ...rest
    }) => ({

      ...rest,

      FeedbackListQuery: {
        ...queryRest,

        variables,
        feedbacks,
        fetchMore,

        prevPage: () =>
          fetchMore({
            query: FeedbackListQuery,
            variables: {
              ...variables,
              before: feedbacks.cursors.before
            },
            updateQuery: (
              { feedbacks: oldFeedbacks },
              { fetchMoreResult: { feedbacks } }
            ) => ({
              feedbacks:
                  feedbacks.items.length > 0
                    ? feedbacks
                    : oldFeedbacks
            })
          }),

        nextPage: () =>
          fetchMore({
            query: FeedbackListQuery,
            variables: {
              ...variables,
              after: feedbacks.cursors.after
            },
            updateQuery: (
              { feedbacks: oldFeedbacks },
              { fetchMoreResult: { feedbacks } }
            ) => ({
              feedbacks:
                  feedbacks.items.length > 0
                    ? feedbacks
                    : oldFeedbacks
            })
          })
      }
    })
  })
)(FacilityFeedbackListing)
