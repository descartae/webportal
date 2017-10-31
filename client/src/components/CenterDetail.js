import React from 'react'
import { gql, graphql } from 'react-apollo'

const CenterDetail = ({ data: { loading, error, center }, match }) => {
  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{ error.message }</p>
  }

  return (
    <div className='centerDetail'>
      {center.name}
      {center.location}
      {center.website}
      {center.telephone}
      {center.typeofWaste}
      {center.openHours}
    </div>

  )
}

export const centerDetailQuery = gql`
  query CenterDetailQuery {
  center(id: $centerId) {
      _id
      name
      location
      website
      telephone
      typeofWaste {
        aluminium
        compost
        cookingOil
        ewaste
        furniture
        glass
        greenWaste
        hazardousWaste
        paper
        plastic
      }  
      openHours {
        dayofWeek
        startTime
        endTime
      }  
    }
  }
`

export default (graphql(centerDetailQuery, {
  options: (props) => ({
    variables: { centerId: props.match.params.centerId}
  })
})(CenterDetail));
