import React from 'react'
import {
  Link
} from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import {List, ListItem} from 'material-ui/List';
import FacilityCreator  from './FacilityCreator';

const FacilityListing = ({ data: { loading, error, facilities } }) => {
  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{ error.message }</p>
  }

 return (
      <div className='facilityList'>
        <br/> 
        <FacilityCreator/>
        <br/>
        <hr/>
        <h3>Facilities</h3>
        <List>
          { facilities.items.map(it =>
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
  query FacilityListQuery($after: Cursor, $before: Cursor) {
    facilities(filters: {
      cursor: {
        after: $after
        before: $before
        quantity: 10
      }
    }) {
      cursors {
        after
        before
      }

      items {
        _id
        name
      }
    }
  }
`

export { FacilityListing }
export const FacilityListingWithData = graphql(facilityListQuery)(FacilityListing)
