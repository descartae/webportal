import React, {Component} from 'react';
import { gql, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
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
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import UpdateFacility from './UpdateFacility';

const style = {
  margin: 12,
};

const facilityDetailsQuery = gql`
  query FacilityDetails($_id:ID!) {
    facility(_id:$_id) {
      _id
      name
      telephone
      location {
        municipality
        state
        zip
      }
      typesOfWaste {_id}
      openHours {dayOfWeek}
    }
  }
`

class FacilityDetails extends Component {
  constructor(props) {
    super(props);
  }
  
  render () {
     const state = {
      fixedHeader: true,
      stripedRows: false,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: false,
      showCheckboxes: false,
      height: '100px',
    };

    return (
    <div className='container'>
      <div className='facilityDetails'>
        <UpdateFacility/>
        <h3>{this.props.facility.name}</h3>
        <hr/>
        <p><ActionRoom /> Address: {this.props.facility.location.address}, {this.props.facility.location.municipality}, {this.props.facility.location.state} {this.props.facility.location.zip}</p>
        <p><CommunicationCall/> Contact: {this.props.facility.telephone}</p>
        <p><strong>Types of Waste</strong>:</p>
        { this.props.facility.typesOfWaste.map(it => (
          <div key={it._id} className='typesOfWastes'>
            {/* image fails to load
            <img src={it.icon} alt={it.name} /> */}
           <MapsLocalOffer/> {it.name}
          </div>
        ))}
        <br/>
        <Table
          header={state.height}
          fixedHeader={state.fixedHeader}
          selectable={state.selectable} 
          multiSelectable={state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={state.showCheckboxes}
            adjustForCheckbox={state.showCheckboxes}
            enableSelectAll={state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="3" style={{textAlign: 'left'}}>
                <ActionSchedule/> Schedule
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>Day</TableHeaderColumn>
              <TableHeaderColumn>Open</TableHeaderColumn>
              <TableHeaderColumn>Close</TableHeaderColumn>
            </TableRow>
          </TableHeader>         
          <TableBody
            displayRowCheckbox={state.showCheckboxes}
            deselectOnClickaway={state.deselectOnClickaway}
            showRowHover={state.showRowHover}
            stripedRows={state.stripedRows}
          >
            {this.props.facility.openHours.map(it => (
              <TableRow key={it.dayOfWeek}>
                <TableRowColumn>{it.dayOfWeek}</TableRowColumn>
                <TableRowColumn>{it.startTime}:00</TableRowColumn>
                <TableRowColumn>{it.endTime}:00</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
        <br/>

      </div>
    </div>
    )
  }

};

const FacilityDetailsWithMutations =  graphql(facilityDetailsQuery, {name : 'facilityDetailsQuery'})(withRouter(FacilityDetails))

export default FacilityDetailsWithMutations
