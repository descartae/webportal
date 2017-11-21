import React from 'react'
import {
  Link
} from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import {List, ListItem} from 'material-ui/List';
import CenterCreator from './CenterCreator';

const CenterListing = ({ data: { loading, error, centers } }) => {
  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{ error.message }</p>
  }

 return (
      <div className='centersList'>
        <CenterCreator/>
        <br/>
        <h3>Pontos de coleta</h3>
        <List>
          { centers.map(it =>
            (<div key={it._id} className='center'>
              <ListItem>
                <Link to={it._id < 0 ? `/` : `centers/${it._id}`}>
                  {it.name}
                </Link>
              </ListItem>
            </div>)
          )}
        </List>
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
