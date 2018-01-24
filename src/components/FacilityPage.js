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
import { facilityListQuery } from './FacilityListing';
const style = {
  margin: 12,
};


class UpdateFacility extends Component {

  static propTypes = {
    facility: propType(facilityDetailsQuery).isRequired,
  }
  constructor(props) {
    super(props);
    console.log(JSON.stringify(this.props.facility))
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
          <RaisedButton primary={true} label="Update Facility" onClick={this.handleOpen} />
          <FlatButton secondary={true} label="Delete Facility" onClick={()=> this._deleteFacility()} />
          <Dialog
            title="Update Facility"
            modal={true}
            actions={actions}
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
           </form>
          </Dialog>
        </div>
    )
  };

// TODO: After saving, facility details page should reload with updated information

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
    }).then(this.props.history.push('/'))   
  };

  _deleteFacility = () => {
    this.props.deleteFacilityMutation({
      variables: { 
        _id: this.props.facility._id 
      }, 
      refetchQueries: [{ query: facilityListQuery }]
    }).then(this.props.history.push('/'))
  };
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

const UpdateFacilityWithMutations =  graphql(deleteFacilityMutation, {name : 'deleteFacilityMutation'})(
  graphql(updateFacilityMutation, {name: 'updateFacilityMutation'})(withRouter(UpdateFacility))
);

export default UpdateFacilityWithMutations;
