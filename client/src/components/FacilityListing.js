import React from 'react'
import {
  Link
} from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import {List, ListItem} from 'material-ui/List';

const FacilityListing = ({ data: { loading, error, facilities } }) => {
  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{ error.message }</p>
  }

 return (
      <div className='facilityList'>
        <h3>Pontos de coleta</h3>
        <List>
          { facilities.map(it =>
            (<div key={it._id} className='facility'>
              <ListItem>
                <Link to={it._id < 0 ? `/` : `facilities/${it._id}`}>
                  {it.name}
                </Link>
              </ListItem>
            </div>)
          )}
        </List>
    </div>

  )

}

export const facilityListQuery = gql`
  query FacilityListQuery {
    facilities {
      _id
      name
    }
  }
`

export { FacilityListing }
export const FacilityListingWithData = graphql(facilityListQuery)(FacilityListing)
