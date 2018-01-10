import React, {Component}  from 'react';
import { gql, graphql } from 'react-apollo';
import { facilityListQuery } from './FacilityListing';
import { withRouter } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const facilityCreationMutation = gql`
  mutation AddFacility(
    $name: String!,
    $address: String!,
    $municipality: String!,
    $state: String!,
    $zip: String!,
    $typesOfWaste: [ID],
    $openHours: [OpenTimeInput],
  ) {
  addFacility(input: {
    name: $name,
    location: {
      address: $address,
      municipality: $municipality,
      state: $state,
       zip: $zip
      },
      typesOfWaste: $typesOfWaste,
      openHours: $openHours
    }) {
    success
    facility {
      _id
      name
    }
  }
}
`
const customContentStyle = {
  width: '80%',
  maxWidth: 'none',
};

function generateEmptyCalendar() {
  var openHours = [];
  for (var day of ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]) {
    openHours.push({
      dayOfWeek: day,
      startTime: '',
      endTime: '',
    });
  }
  console.log(openHours);
  return openHours;
}


class FacilityCreator extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      name: '',
      address: '',
      municipality: '',
      state: '',
      zip: '',
      typesOfWaste: [],
      openHours: generateEmptyCalendar(),
      daysOfWeek: ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"],
      startTime: '',
      endTime: '',
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  async onSubmit(e) {
    e.preventDefault();
    const { name, address, municipality, zip, state, typesOfWaste, openHours } = this.state;
    await this.props.facilityCreationMutation({
      variables: {
        name,
        address,
        municipality,
        state,
        zip,
        typesOfWaste,
        openHours
      },
      refetchQueries: [{ query: facilityListQuery }]
    });
    this.state.name = '';
    this.state.address = '';
    this.state.municipality = '';
    this.state.state = '';
    this.state.zip = '';
    this.state.typesOfWaste = [];
    this.state.openHours = generateEmptyCalendar();
    this.props.history.go('0');
  }

  handleChange = (event, index, typesOfWaste) => this.setState({typesOfWaste});

  menuItems(typesOfWaste) {
    return typesOfWaste.map((it) => (
      <MenuItem
        key={it._id}
        insetChildren={true}
        checked={this.state.typesOfWaste.indexOf(it._id) > -1}
        value={it._id}
        primaryText={it.name}
      />
    ));
  }

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <RaisedButton
        type="submit"
        label="Save"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />
    ];

    const { loading, error, typesOfWaste } = this.props.typesOfWasteListQuery

    if (loading) {
      return (
        <div className='container'>
          <p>Loading..</p>
        </div>
      )
    }

    if (error) {
      return (
        <div className='container'>
          <p>{ error.message }</p>
        </div>
      )
    }

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
        <RaisedButton label="Create New Facility" onClick={this.handleOpen} />
        <Dialog
          title="Create New Facility"
          modal={true}
          contentStyle={customContentStyle}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
        <form onSubmit={this.onSubmit.bind(this)}>
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
         <SelectField 
          multiple={true}
          hintText="Select Type(s) Of Waste"
          value={this.state.typesOfWaste}
          onChange={this.handleChange}
          className='facilityWaste'
         >
          {this.menuItems(typesOfWaste)}
         </SelectField>
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
                  Schedule
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
              {this.state.openHours.map((it, idx) => (
                <TableRow key={it.dayOfWeek}>
                  <TableRowColumn>{it.dayOfWeek}</TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      className='facilityStartTime'
                      value={it.startTime}
                      onChange={(e) => { 
                        var obj = {openHours: this.state.openHours}; //set key 'openHours' to this.state.openHours inside an object
                        obj.openHours[idx].startTime = e.target.value;
                        this.setState(obj) // pass object into setState to update this.state
                      }}
                      hintText='HHMM'
                    />
                    <br/><br/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      className='facilityEndTime'
                      value={it.endTime}
                      onChange={(e) => { 
                        var obj = {openHours: this.state.openHours}; //set key 'openHours' to this.state.openHours inside an object
                        obj.openHours[idx].endTime = e.target.value;
                        this.setState(obj)
                      }}
                      hintText='HHMM'
                    />
                    <br/><br/>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div style={{ textAlign: 'right', padding: 8, margin: '24px -24px -24px -24px' }}>
            {actions}
          </div>
          </form>
        </Dialog>
      </div>
    )
  }
}

export const typesOfWasteListQuery = gql`
  query TypeOfWasteListQuery {
    typesOfWaste {
      _id
      name
    }
  }
`

export default graphql(typesOfWasteListQuery, {name: 'typesOfWasteListQuery'})(graphql(facilityCreationMutation, {name: 'facilityCreationMutation'})(withRouter(FacilityCreator)));
