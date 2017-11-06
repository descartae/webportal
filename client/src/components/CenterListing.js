import React from 'react'
import {
  Link
} from 'react-router-dom'
import { gql, graphql } from 'react-apollo'

const CenterListing = ({ data: { loading, error, centers } }) => {
  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{ error.message }</p>
  }

/*
  return (
    <div className='centersList'>
      { centers.map(it =>
        (<div key={it._id} className='center'>{it.name}</div>)
      )}
    </div>

  )
*/

 return (
      <div className='centersList'>
      <h3>Recycling Centers</h3>
      <hr/>
      { centers.map(it =>
        (<div key={it._id} className='center'>
          <Link to={it._id < 0 ? `/` : `centers/${it._id}`}>
            {it.name}
          </Link>
        </div>)
      )}
    </div>

  )

}

export const centersListQuery = gql`
  query CentersListQuery {
    centers {
      _id
      name
    }
  }
`

export { CenterListing }
export const CenterListingWithData = graphql(centersListQuery)(CenterListing)
