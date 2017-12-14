import React from 'react';
import NotFound from './NotFound';
import {
    gql,
    graphql,
} from 'react-apollo';
import PropTypes from 'prop-types';
import { filter } from 'graphql-anywhere';
import { withRouter } from 'react-router-dom';
import FacilityPage from './FacilityPage';

class FacilityDetails extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      Facility: PropTypes.object,
    }).isRequired,
    history: PropTypes.object.isRequired
  }


  render () {
    console.log(this.props.data)
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }

    const facility = this.props.data.facility

    return (
      <div>
        <FacilityPage facility={filter(FacilityPage.fragments.facility, facility)} handleCancel={this.goBack}/>
      </div>
    )
  }

  goBack = () => {
    this.props.history.push('/');
  }
}


const facilityDetailsQuery = gql`
  query FacilityDetailsQuery($facilityId: ID!) {
  facility(_id: $facilityId) {
      ... FacilityPageFacility
    }
  }
  ${FacilityPage.fragments.facility}
`;

export { FacilityDetails }
export const FacilityDetailsWithData = graphql(facilityDetailsQuery, {
  options: (props) => ({
    variables: { facilityId: props.match.params.facilityId}
  })
})(withRouter(FacilityDetails));
