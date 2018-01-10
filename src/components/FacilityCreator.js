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
const style = {
  margin: 12,
}

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
  
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  constructor(props) {
    super(props);

    this.state = {
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

  async onSubmit(e) {
    e.preventDefault();
    const { name, address, municipality, zip, state, typesOfWaste, daysOfWeek, startTime, endTime, openHours } = this.state;
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
    this.state.daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    this.state.startTime = '';
    this.state.endTime = '';
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
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
        
      <div className='container'>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            className='facilityName'
            value={this.state.name}
            onChange={(e) => this.setState({name: e.target.value})}
            type='text'
            placeholder='Enter Facility Name'
          />
          <input
              className='facilityAddress '
              value={this.state.address}
              onChange={(e) => this.setState({address: e.target.value})}
              type='text'
              placeholder='Enter Facility Address'
          />
          <input
              className='facilityMunicipality'
              value={this.state.municipality}
              onChange={(e) => this.setState({municipality: e.target.value})}
              type='text'
              placeholder='Enter Facility Municipality'
            />
          <input
              className='facilityState'
              value={this.state.state}
              onChange={(e) => this.setState({state: e.target.value})}
              type='text'
              placeholder='Enter Facility State'
            />
          <input
              className='facilityZip'
              value={this.state.zip}
              onChange={(e) => this.setState({zip: e.target.value})}
              type='text'
              placeholder='Enter Facility Zip'
            />
          <br/>
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
                  Horários
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
              {this.state.openHours.map((it, idx) => (
                <TableRow key={it.dayOfWeek}>
                  <TableRowColumn>{it.dayOfWeek}</TableRowColumn>
                  <TableRowColumn>
                    <input
                      className='facilityStartTime'
                      value={it.startTime}
                      onChange={(e) => { 
                        var obj = {openHours: this.state.openHours}; //set key 'openHours' to this.state.openHours inside an object
                        obj.openHours[idx].startTime = e.target.value;
                        this.setState(obj) // pass object into setState to update this.state
                      }}
                      type='text'
                      placeholder='HHMM'
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <input
                      className='facilityEndTime'
                      value={it.endTime}
                      onChange={(e) => { 
                        var obj = {openHours: this.state.openHours}; //set key 'openHours' to this.state.openHours inside an object
                        obj.openHours[idx].endTime = e.target.value;
                        this.setState(obj)
                      }}
                      type='text'
                      placeholder='HHMM'
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <RaisedButton
            type='submit'
            primary={true} 
            style={style}
          >
            Save
          </RaisedButton>

        </form>
      </div>
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
