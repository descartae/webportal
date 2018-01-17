import React, {Component} from 'react'
import { gql, graphql } from 'react-apollo'
import { propType } from 'graphql-anywhere';
import { withRouter } from 'react-router-dom';
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
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { facilityDetailsQuery } from './FacilityDetails';

const style = {
  margin: 12,
};


class UpdateFacility extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      name: this.props.facility.name,
      telephone: this.props.facility.telephone,
      website: this.props.facility.website,
      address: this.props.facility.location.address,
      municipality: this.props.facility.location.municipality,
      state: this.props.facility.location.state,
      zip: this.props.facility.location.zip
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

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
      height: '300px'
    };

    const actions = [
      <RaisedButton
        primary={true}
        style={style}
        label="Save"
        onClick={() => this._updateFacility()}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />
    ];

      return (
        <div className='container'>
          <div className='facilityDetails'>
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
            <RaisedButton primary={true} label="Edit" onClick={this.handleOpen} />
            <Dialog
              title="Edit Facility"
              modal={true}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent={true}
            >
              <form>
                <TextField
                  className='nameOfFacility'
                  value={this.state.name}
                  onChange={(e) => this.setState({name: e.target.value})}
                  hintText='Facility Name'
                  type='Facility Name'
                /><br/>
                <TextField
                  className='facilityTelephone'
                  value={this.state.telephone}
                  onChange={(e) => this.setState({telephone: e.target.value})}
                  hintText='Telephone'
                  type='Facility Telephone'
                /><br/>
                <TextField
                  className='facilityWebsite'
                  value={this.state.website}
                  onChange={(e) => this.setState({website: e.target.value})}
                  hintText='Website'
                  type='Website'
                /><br/>
                <TextField
                  className='facilityAddress'
                  value={this.state.address}
                  onChange={(e) => this.setState({address: e.target.value})}
                  hintText='Address'
                  type='Address'
                /><br/>
                <TextField
                  className='facilityMunicipality'
                  value={this.state.municipality}
                  onChange={(e) => this.setState({municipality: e.target.value})}
                  hintText='Municipality'
                  type='Municipality'
                 /><br/>
                <TextField
                  className='facilityState'
                  value={this.state.state}
                  onChange={(e) => this.setState({state: e.target.value})}
                  hintText='State'
                  type='State'
                /><br/>
                <TextField
                  className='facilityZip'
                  value={this.state.zip}
                  onChange={(e) => this.setState({zip: e.target.value})}
                  hintText='Zip'
                  type='Zip'
                 /><br/>
                <div style={{ textAlign: 'right', padding: 8, margin: '24px -24px -24px -24px' }}>
                  {actions}
                </div>
              </form>
            </Dialog>

            <RaisedButton
              label="Back"
              style={style}
              onClick={this.props.handleCancel}
            />
        </div>
    )
  };

  _updateFacility = () => {
    this.props.updateFacilityMutation({
      variables: {
        _id: this.props.facility._id, 
        name: this.state.name, 
        telephone: this.state.telephone, 
        website: this.state.website, 
        address: this.state.address, 
        state: this.state.state, 
        municipality: this.state.municipality, 
        zip: this.state.zip 
      }
    }).then(this.props.afterChange)
  };

  handleDelete = () => {
    this.props.deleteFacility({variables: { _id: this.props.facility._id }})
      .then(this.props.afterChange)
  };

const updateFacilityMutation = gql`
  mutation UpdateFacility(
    $_id: ID!, 
    $name: String!,
    $address: String!,
    $municipality: String!,
    $state: String!,
    $zip: String!
  ) {
    updateFacility(input: {
      _id: $_id, 
      patch:{
        name: $name,
        location: {
          address: $address,
          municipality: $municipality,
          state: $state,
          zip: $zip
        }
      }
    }) {
      success
      facility {
        _id
        name
      }
    }    
  }
`

const deleteFacilityMutation = gql`
  mutation DisableFacility(
    $_id: ID!
  ) {
    disableFacility(input: {
      _id: $_id
    }) {
      success
    }
  }
`

const UpdateFacilityWithMutations =  graphql(deleteFacility, {name : 'deleteFacilityMutation'})(
  graphql(updateFacility, {name: 'updateFacilityMutation'})(withRouter(FacilityDetails))
)

export default UpdateFacilityWithMutations
