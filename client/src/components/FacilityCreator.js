import React, {Component}  from 'react';
import { gql, graphql } from 'react-apollo';
import { facilityListQuery } from './FacilityListing'
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

const facilityCreationMutation = gql`
  mutation AddFacility(
    $name: String!,
    $address: String!,
    $municipality: String!,
    $state: String!,
    $zip: String!,
    $typeOfWaste: [ID],
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
      typesOfWaste: $typeOfWaste,
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

function generateEmptyCalendar() {
  var calendar = [];
  for (var day of ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]) {
    calendar.push({
      dayOfWeek: day,
      startTime: '',
      endTime: '',
    });
  }
  console.log(calendar);
  return calendar;
}


class FacilityCreator extends Component {
   constructor(props) {
    super(props);

    this.state = {
      name: '',
      address: '',
      municipality: '',
      state: '',
      zip: '',
      typeOfWaste: '',
      calendar: generateEmptyCalendar(),
      daysOfWeek: ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"],
      startTime: '',
      endTime: '',
    };
  }

 static propTypes = {
    history: PropTypes.object.isRequired,
  }

  async onSubmit(e) {
    e.preventDefault();
    const { name, address, municipality, zip, state, typeOfWaste, daysOfWeek, startTime, endTime, calendar } = this.state;
    await this.props.facilityCreationMutation({
      variables: {
        name,
        address,
        municipality,
        state,
        zip,
        typeOfWaste,
        calendar,
        daysOfWeek,
        startTime,
        endTime
      },
      refetchQueries: [{ query: facilityListQuery }]
    });
    this.state.name = '';
    this.state.address = '';
    this.state.municipality = '';
    this.state.state = '';
    this.state.zip = '';
    this.state.typeOfWaste = '';
    this.state.calendar = generateEmptyCalendar();
    this.state.daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    this.state.startTime = '';
    this.state.endTime = '';
    this.props.history.push('/');
  }
  render() {
    const { loading, error, typesOfWaste } = this.props.typeOfWasteListQuery

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
      height: '300px',
    };


  //  const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
//    console.log("this.props: " + JSON.stringify(this.props));
//    console.log("openHours: " + JSON.stringify(this.state.daysOfWeek));
    return (
      <div className='container'>
        <strong>Create New Facility</strong>
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
          <select onChange={(e) => this.setState({ typeOfWaste: e.target.value })} value={this.state.typeOfWaste} className='facilityWaste'>
            <option value="" abled>Preferred Type of Waste</option>
            {typesOfWaste.map(it => <option key={it._id} value={it._id}>{it.name}</option>)}
          </select>
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
            {this.state.calendar.map((it, idx) => (
              <TableRow key={it.dayOfWeek}>
                <TableRowColumn>{it.dayOfWeek}</TableRowColumn>
                <TableRowColumn>
                  <input
                    className='facilityStartTime'
                    value={it.startTime}
                    onChange={(e) => { 
                      var obj = {calendar: this.state.calendar}; //set key 'calendar' to this.state.calendar inside an object
                      obj.calendar[idx].startTime = e.target.value;
                      this.setState(obj) // pass object into setState to update this.state
                    }}
                    type='text'
                    placeholder='Enter Start Time'
                  />
                </TableRowColumn>
<TableRowColumn>
                  <input
                    className='facilityEndTime'
                    value={it.endTime}
                    onChange={(e) => { 
                      var obj = {calendar: this.state.calendar};
                      obj.calendar[idx].endTime = e.target.value;
                      this.setState(obj)
                    }}
                    type='text'
                    placeholder='Enter End Time'
                  />
                </TableRowColumn>
              </TableRow>
              ))}
            </TableBody>
          </Table>
          <button
          type='submit'
          >
            Save
          </button>

        </form>
      </div>
    )
  }
}

export const typeOfWasteListQuery = gql`
  query TypeOfWasteListQuery {
    typesOfWaste {
      _id
      name
    }
  }
`

export default graphql(typeOfWasteListQuery, {name: 'typeOfWasteListQuery'})(graphql(facilityCreationMutation, {name: 'facilityCreationMutation'})(withRouter(FacilityCreator)));
