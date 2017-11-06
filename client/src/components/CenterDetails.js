import React from 'react';
import NotFound from './NotFound';

import {
    gql,
    graphql,
} from 'react-apollo';

const CenterDetails = ({ data: { loading, error, center }, match }) => {
  console.log("HELLO!!!");
  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{ error.message }</p>
  }

  if (center === null) {
    return <NotFound />
  }
  
  return (
    <div>
      <div className='centerDetails'>
        Name: {center.name}
        <br/>
        Website: {center.website}
        <br/>
        Address:
        {center.location.address}, 
        {center.location.municipality}, {center.location.state} {center.location.zip}
        <br/>
        Telephone: {center.telephone} 
        <br/>
        Types of Waste: {center.typesOfWaste.name}
        <br/>
        Open Hours: 
        <hr/>

        {center.openHours.dayOfWeek}
        {center.openHours.startTime}
        {center.openHours.endTime}
      </div>
    </div>
  );
}

export const centerDetailsQuery = gql`
  query CenterDetailsQuery($centerId: ID!) {
  center(_id: $centerId) {
      _id
      name
      telephone
      website
      location {
        address
        municipality
        state
        zip
      } 
      typesOfWaste {
        _id
        name
        icon
      }
      openHours {
        dayOfWeek
        startTime
        endTime
      }
    }
  }
`;

export { CenterDetails }
export const CenterDetailsWithData = (graphql(centerDetailsQuery, {
  options: (props) => ({
    variables: { centerId: props.match.params.centerId}
  })
})(CenterDetails)); 
