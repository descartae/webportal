import React from 'react';
import NotFound from './NotFound';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {
    gql,
    graphql,
} from 'react-apollo';

const CenterDetails = ({ data: { loading, error, center }, match }) => {
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
      <div className='centerDetails container'>
        <h3>{center.name}</h3>
        <hr/>
        <p><strong>Address:</strong></p>
        <p>{center.location.address},</p>
        <p>{center.location.municipality}, {center.location.state} {center.location.zip}</p>
        <p><strong>Telephone:</strong> {center.telephone}</p>
        <p><strong>Types of Waste:</strong></p>
        <ul>
        { center.typesOfWaste.map(it => (
          <li key={it._id} className='typesOfWastes'>
            {/* image fails to load
            <img src={it.icon} alt={it.name} /> */}
            {it.name}
          </li>
        ))}
        </ul>
        <p><strong>Open Hours:</strong></p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Day of Week</TableHeaderColumn>
              <TableHeaderColumn>Open</TableHeaderColumn>
              <TableHeaderColumn>Close</TableHeaderColumn>
            </TableRow>
          </TableHeader>         
          <TableBody>
            {center.openHours.map(it => (
              <TableRow key={it.dayOfWeek}>
                <TableRowColumn>{it.dayOfWeek}</TableRowColumn>
                <TableRowColumn>{it.startTime}:00</TableRowColumn>
                <TableRowColumn>{it.endTime}:00</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
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
