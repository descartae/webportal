import React from 'react'
import './CenterListing.css'

import { gql, graphql } from 'react-apollo'

const centersListQuery = gql`
  query CentersQuery {
    centers {
      id
      name
    }
  }
`

const CenterListing = ({ data: { loading, error, centers } }) => {
  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{ error.message }</p>
  }

  return (
    <ul>
      { centers.map(it => <li key={it.id}>{ it.name }</li>) }
    </ul>
  )
}

export { centersListQuery, CenterListing }
export const CenterListingWithData = graphql(centersListQuery)(CenterListing)
