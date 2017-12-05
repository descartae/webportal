import React, {Component} from 'react'

import { gql, graphql } from 'react-apollo'

class UpdateFacility extends Component {
  state = {
    _id: '', 
    name: '',
    address: '',
    municipality: '',
    state: '',
    zip: ''
  }

  render () {
    return (
      <div className='container'>
        <strong>Update Facility</strong>
        <div className='form'>
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
        </div>
        <button
          onClick={() => this._updateFacility()}
        >
          Save
        </button>
      </div>
    )
  }

  _updateFacility = async () => {
    const { _id, name, address, municipality, zip, state } = this.state
    await this.props.updateFacilityMutation({
    variables: {
      _id, 
      name,
      address,
      municipality,
      zip,
      state
    }
  })
  }
}

const updateFacilityMutation = gql`
  mutation UpdateFacility(
    $_id: ID!, 
    $name: String!,
    $address: String!,
    $municipality: String!,
    $state: String!,
    $zip: String!
  ) {
    updateFacility(input: {
      _id: $_id, 
      patch:{
        name: $name,
      location: {
        address: $address,
        municipality: $municipality,
        state: $state,
        zip: $zip}
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
export default graphql(updateFacilityMutation, {name: 'updateFacilityMutation'})(UpdateFacility) 
