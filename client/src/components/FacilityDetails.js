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
import PropTypes from 'prop-types';
import { filter } from 'graphql-anywhere';
import { withRouter } from 'react-router';
import FacilityPage from './FacilityPage';

class FacilityDetails extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      Facility: PropTypes.object,
    }).isRequired,
    router: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  }


  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data)
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }

    const facility = this.props.data.Facility

    return (
      <div>
        <FacilityPage faciilty={filter(FacilityPage.fragments.facility, facility)} handleCancel={this.goBack}/>
      </div>
    )
  }

  goBack = () => {
    this.props.router.replace('/')
  }
}


const facilityDetailsQuery = gql`
  query FacilityDetailsQuery($facilityId: ID!) {
  Facility(_id: $facilityId) {
      ... FacilityPageFacility
    }
  }
  ${FacilityPage.fragments.facility}
`;

//export { FacilityDetails }

const FacilityDetailsWithData = graphql(facilityDetailsQuery, {
  options: (ownProps) => ({
    variables: { 
      _id: ownProps.params.facilityId
    }
  })
})(withRouter(FacilityDetails));

export default FacilityDetailsWithData; 
