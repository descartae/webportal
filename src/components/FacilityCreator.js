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
    $zip: String!,
    $typeOfWaste: ID!
  ) {
  addFacility(input: {
    name: $name,
    location: {
      address: $address,
      municipality: $municipality,
      state: $state,
       zip: $zip
      },
      typesOfWaste: [$typeOfWaste]
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
        zip: '',
        typeOfWaste: ''
      };
    }

    static propTypes = {
      history: PropTypes.object.isRequired,
    }

  async onSubmit(e) {
    e.preventDefault();
    const { name, address, municipality, zip, state, typeOfWaste } = this.state;
    await this.props.facilityCreationMutation({
      variables: {
        name,
        address,
        municipality,
        zip,
        state,
        typeOfWaste
      },
      refetchQueries: [{ query: facilityListQuery }]
    });
    this.state.name = '';
    this.state.address = '';
    this.state.municipality = '';
    this.state.state = '';
    this.state.zip = '';
    this.state.typeOfWaste = '';
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
          <select 
            onChange={(e) => this.setState({ typeOfWaste: e.target.value })} 
            value={this.state.typeOfWaste} 
            className='facilityWaste'>
            <option value="" disabled>Preferred Type of Waste</option>
            {typesOfWaste.map(it => <option key={it._id} value={it._id}>{it.name}</option>)}
          </select>
          <button type='submit'>
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
