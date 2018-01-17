import React from 'react';
import NotFound from './NotFound';
import {
    gql,
    graphql,
} from 'react-apollo';
import PropTypes from 'prop-types';
import { filter } from 'graphql-anywhere';
import { withRouter } from 'react-router-dom';
import FacilityDetails from './FacilityDetails';

class FacilityPage extends React.Component {

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
        <FacilityDetails 
          facility={filter(FacilityDetails.fragments.facility, facility)} 
          handleCancel={this.goBack}
          afterChange={this.goBack}  
        />
      </div>
    )
  }

  goBack = () => {
    this.props.history.push('/');
  }
}


const facilityPageQuery = gql`
  query FacilityPageQuery($facilityId: ID!) {
    facility(_id: $facilityId) {
      ... FacilityDetailsFacility
    }
  }
  ${FacilityDetails.fragments.facility}
`;

export { FacilityPage }
export const FacilityPageWithData = graphql(facilityPageQuery, {
  options: (props) => ({
    variables: { facilityId: props.match.params.facilityId}
  })
})(withRouter(FacilityPage));
