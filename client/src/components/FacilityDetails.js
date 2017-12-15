import React from 'react';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
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

export default class FacilityDetails extends React.Component {


  static fragments = {
    facility: gql`
      fragment FacilityDetailsFacility on Facility {
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
    `
  }

  static propTypes = {
    facility: propType(FacilityDetails.fragments.facility).isRequired,
    handleCancel: PropTypes.func.isRequired,
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
      height: '300px',    
    };

    return (
<div className='container'>
      <div className='facilityDetails'>
        <h3>{this.props.facility.name}</h3>
        <hr/>
        <p><ActionRoom /> Endereço: {this.props.facility.location.address}, {this.props.facility.location.municipality}, {this.props.facility.location.state} {this.props.facility.location.zip}</p>
        <p><CommunicationCall/> Contato: {this.props.facility.telephone}</p>
        <p><strong>Tipo de resíduo</strong>:
        { this.props.facility.typesOfWaste.map(it => (
          <p key={it._id} className='typesOfWastes'>
            {/* image fails to load
            <img src={it.icon} alt={it.name} /> */}
           <MapsLocalOffer/> {it.name}
          </p>
        ))}
        </p> 
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
                <ActionSchedule/> Horários
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>Dias</TableHeaderColumn>
              <TableHeaderColumn>Começar</TableHeaderColumn>
              <TableHeaderColumn>Fim</TableHeaderColumn>
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
          <div className='flex justify-between'>
            <button onClick={this.props.handleCancel}>Cancel</button>
          </div>
        </Table>
      </div>
    </div>
    )
  }
}; 
