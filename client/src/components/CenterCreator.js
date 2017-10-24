import React from 'react'

import { gql, graphql } from 'react-apollo'

import { centersListQuery } from './CenterListing'

const centerCreationMutation = gql`
  mutation AddCenter($name: String!) {
    addCenter(name: $name) {
      success
    }
  }
`

const CenterCreator = ({ mutate }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      evt.persist()

      const variables = { name: evt.target.value }

      mutate({
        variables,
        refetchQueries: [{ query: centersListQuery }]
      })
        .then(({ data }) => {
          evt.target.value = ''

          console.log(`Result: \n${JSON.stringify(data, null, 2)}`)
        })
    }
  }

  return (
    <input
      type='text'
      placeholder='New Center'
      onKeyUp={handleKeyUp}
      />
  )
}

export { centerCreationMutation, CenterCreator }
export const CenterCreatorWithData = graphql(centerCreationMutation)(CenterCreator)
