import React from 'react'
import { gql, graphql } from 'react-apollo'

const CenterListing = ({ data: { loading, error, centers } }) => {
  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{ error.message }</p>
  }

  return (
    <div className="centersList">
      { centers.map( it =>
        (<div key={it.id} className="center">{it.name}</div>)
      )}
    </div>

  )
}

export const centersListQuery = gql`
  query CentersListQuery {
    centers {
      id
      name
    }
  }
`;

/*
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
 */

export { CenterListing }
export const CenterListingWithData = graphql(centersListQuery)(CenterListing) 

