import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { gql, graphql, compose } from 'react-apollo'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import CheckCircleIcon from 'material-ui-icons/CheckCircle'

import NotFound from '../NotFound'
import Loading from '../Loading'

import { FacilityListQuery } from './FacilityListing'

class FeedbackDetails extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  static styles = theme => ({
    content: { padding: 16, whiteSpace: 'pre-wrap' },
    button: { marginTop: 16 },
    buttonIcon: {
      marginRight: theme.spacing.unit
    }
  })

  async onSubmit (e) {
    e.preventDefault()
    const { FeedbackDetailsQuery: { feedback: { _id } } } = this.props
    const variables = { id: _id }

    await this.props.FeedbackResolveMutation({ variables })

    const { match, history } = this.props
    history.push(match.url.split(`/${_id}`)[0])
  }

  render () {
    const { classes, FeedbackDetailsQuery: { loading, error, feedback } } = this.props

    if (loading) {
      return <Loading />
    }

    if (error) {
      return <p>{ error.message }</p>
    }

    if (feedback === null) {
      return <NotFound />
    }

    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <Paper className={classes.content}>{feedback.contents}</Paper>
          <Button disabled={feedback.resolved} variant='raised' color='primary' type='submit' size='small' className={classes.button}>
            <CheckCircleIcon className={classes.buttonIcon} />
            {feedback.resolved ? 'Resolvido' : 'Marcar como resolvido'}
          </Button>
        </form>
      </div>
    )
  }
}

export const FeedbackDetailsQuery = gql`
  query FeedbackDetailsQuery($feedbackId: ID!) {
    feedback(_id: $feedbackId) {
      _id
      resolved
      contents
    }
  }
`

export const FeedbackResolveMutation = gql`
  mutation FeedbackResolveMutation($id: ID!) {
    resolveFeedback(input: {_id: $id}) {
      success
      feedback {
        _id
        resolved
        contents
      }
    }
  }
`

export default compose(
  withStyles(FeedbackDetails.styles, { withTheme: true }),
  graphql(FeedbackDetailsQuery, {
    name: 'FeedbackDetailsQuery',
    options: (props) => ({
      variables: { feedbackId: props.match.params.feedbackId }
    })
  }),
  graphql(FeedbackResolveMutation, {
    name: 'FeedbackResolveMutation',
    options: {
      refetchQueries: [FacilityListQuery.name]
    }
  })
)(FeedbackDetails)
