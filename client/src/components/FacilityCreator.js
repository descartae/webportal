import React from 'react'

import { gql, graphql } from 'react-apollo'

import { facilityListQuery } from './FacilityListing'

const facilityCreationMutation = gql`
  mutation AddFacility($name: String!) {
    addFacility(name: $name) {
      success
    }
  }
`

const FacilityCreator = ({ mutate }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      evt.persist()

      const variables = { name: evt.target.value }

      mutate({
        variables,
        refetchQueries: [{ query: facilityListQuery }]
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
      placeholder='New Facility'
      onKeyUp={handleKeyUp}
      />
  )
}

export { facilityCreationMutation, FacilityCreator }
export const FacilityCreatorWithData = graphql(facilityCreationMutation)(FacilityCreator)
