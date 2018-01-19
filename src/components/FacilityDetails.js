import React from 'react';
import { gql, graphql } from 'react-apollo';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FacilityPage from './FacilityPage';
import NotFound from './NotFound';

const style = {
  margin: 12,
};

const FacilityDetails = ({ data: { loading, error, facility }, match }) => {
  
    if (loading) {
      return (<div>Loading...</div>)
    }

    if (error) {
      return <p>{ error.message }</p>
    }

    if (facility === null) {
      return <NotFound/>
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
        <div className='facilityDetails'>
          <h3>{facility.name}</h3>
          <p><strong>Address: </strong> {facility.location.address}, {facility.location.municipality}, {facility.location.state} {facility.location.zip}</p>
          <p><strong>Contact: </strong> {facility.telephone}</p>
          <p><strong>Types of Waste: </strong></p>
          { facility.typesOfWaste.map(it => (
            <div key={it._id} className='typesOfWastes'>
             <img src={it.icons.iosSmallURL} alt={it.name} width='25'/> {it.name}
            </div>
          ))}
          <br/>
          <Table
            style={{minWidth: '250px', maxWidth: '400px'}}
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
                <TableHeaderColumn colSpan="3" style={{textAlign: 'left', color: 'black'}}>
                  <strong> Schedule </strong>
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn><h4>Day</h4></TableHeaderColumn>
                <TableHeaderColumn><h4>Open</h4></TableHeaderColumn>
                <TableHeaderColumn><h4>Close</h4></TableHeaderColumn>
              </TableRow>
            </TableHeader>         
            <TableBody
              displayRowCheckbox={state.showCheckboxes}
              deselectOnClickaway={state.deselectOnClickaway}
              showRowHover={state.showRowHover}
              stripedRows={state.stripedRows}
            >
              {facility.openHours.map(it => (
                <TableRow key={it.dayOfWeek}>
                  <TableRowColumn>{it.dayOfWeek}</TableRowColumn>
                  <TableRowColumn>{it.startTime}:00</TableRowColumn>
                  <TableRowColumn>{it.endTime}:00</TableRowColumn>
                </TableRow>
                ))}
            </TableBody>
          </Table>
          <br/>
          <FacilityPage facility={facility}/> 
        </div>
      </div>
      )
}

export const facilityDetailsQuery = gql`
  query FacilityDetails($facilityId: ID!) {
    facility(_id: $facilityId)  {
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
				icons {
        	iosSmallURL 
          iosMediumURL 
          iosLargeURL 
          androidSmallURL 
          androidMediumURL 
          androidLargeURL
        }
        description
      }
      openHours {
        dayOfWeek
        startTime
        endTime
        }
    }
  }
`

export { FacilityDetails }

export const FacilityDetailsWithData = (graphql(facilityDetailsQuery, {
  options: (props) => ({
    variables: { facilityId: props.match.params.facilityId}
  })
})(FacilityDetails));
