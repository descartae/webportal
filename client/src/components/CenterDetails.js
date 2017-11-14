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
import ActionRoom from 'material-ui/svg-icons/action/room';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import MapsLocalOffer from 'material-ui/svg-icons/maps/local-offer';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
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
  
  {/* Setting the state of the table */}  
  this.state = {
    fixedHeader: true,
    stripedRows: false,
    showRowHover: false,
    selectable: false,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: false,
    showCheckboxes: false,
    height: '300px',
  };

  return (
    <div className='container'>
      <div className='centerDetails'>
        <h3>{center.name}</h3>
        <hr/>
        <p><ActionRoom /> {center.location.address}, {center.location.municipality}, {center.location.state} {center.location.zip}</p>
        <p><CommunicationCall/> {center.telephone}</p>
        <p><strong>Types of Waste:</strong></p>
        { center.typesOfWaste.map(it => (
          <p key={it._id} className='typesOfWastes'>
            {/* image fails to load
            <img src={it.icon} alt={it.name} /> */}
           <MapsLocalOffer/> {it.name}
          </p>
        ))}
        <br/>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="3" style={{textAlign: 'center'}}>
                <ActionSchedule/> Hours 
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>Day of Week</TableHeaderColumn>
              <TableHeaderColumn>Open</TableHeaderColumn>
              <TableHeaderColumn>Close</TableHeaderColumn>
            </TableRow>
          </TableHeader>         
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
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
