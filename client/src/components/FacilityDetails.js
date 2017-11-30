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

const FacilityDetails = ({ data: { loading, error, facility }, match }) => {
  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{ error.message }</p>
  }

  if (facility === null) {
    return <NotFound />
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

  return (
    <div className='container'>
      <div className='facilityDetails'>
        <h3>{facility.name}</h3>
        <hr/>
        <p><ActionRoom /> Endereço: {facility.location.address}, {facility.location.municipality}, {facility.location.state} {facility.location.zip}</p>
        <p><CommunicationCall/> Contato: {facility.telephone}</p>
        <p><strong>Tipo de resíduo</strong>:
        { facility.typesOfWaste.map(it => (
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
            {facility.openHours.map(it => (
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

export const facilityDetailsQuery = gql`
  query FacilityDetailsQuery($facilityId: ID!) {
  facility(_id: $facilityId) {
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

export { FacilityDetails }
export const FacilityDetailsWithData = (graphql(facilityDetailsQuery, {
  options: (props) => ({
    variables: { facilityId: props.match.params.facilityId}
  })
})(FacilityDetails));
