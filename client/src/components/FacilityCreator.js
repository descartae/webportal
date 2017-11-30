import React, {Component}  from 'react';
import { gql, graphql } from 'react-apollo';
import { facilityListQuery } from './FacilityListing'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const facilityCreationMutation = gql`
  mutation AddFacility(
    $name: String!,
    $address: String!,
    $municipality: String!,
    $state: String!,
    $zip: String!
  ) {
  addFacility(input: {
    name: $name,
    location: {
      address: $address,
      municipality: $municipality,
      state: $state,
       zip: $zip
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

class FacilityCreator extends Component {
   constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      municipality: '',
      state: '',
      zip: ''
    };
  }

 static propTypes = {
    history: PropTypes.object.isRequired,
  }

  async onSubmit(e) {
    e.preventDefault();
    const { name, address, municipality, zip, state } = this.state;
    await this.props.facilityCreationMutation({
      variables: {
        name,
        address,
        municipality,
        zip,
        state
      },
      refetchQueries: [{ query: facilityListQuery }]
    });
    this.state.name = '';
    this.state.address = '';
    this.state.municipality = '';
    this.state.state = '';
    this.state.zip = '';
    this.props.history.push('/');
  }
  render() {
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
              value={this.state.Zip}
              onChange={(e) => this.setState({zip: e.target.value})}
              type='text'
              placeholder='Enter Facility Zip'
            />
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

export default graphql(facilityCreationMutation, {name: 'facilityCreationMutation'})(withRouter(FacilityCreator));
