import React, {Component} from 'react'

import { gql, graphql } from 'react-apollo'

class UpdateCenter extends Component {
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
        <strong>Update Center</strong>
        <div className='form'>
          <input
            className='centerName'
            value={this.state.name}
            onChange={(e) => this.setState({name: e.target.value})}
            type='text'
            placeholder='Enter Center Name'
          />
        
        <input
            className='centerAddress '
            value={this.state.address}
            onChange={(e) => this.setState({address: e.target.value})}
            type='text'
            placeholder='Enter Center Address'
         />
        <input
            className='centerMunicipality'
            value={this.state.municipality}
            onChange={(e) => this.setState({municipality: e.target.value})}
            type='text'
            placeholder='Enter Center Municipality'
          />
        <input
            className='centerState'
            value={this.state.state}
            onChange={(e) => this.setState({state: e.target.value})}
            type='text'
            placeholder='Enter Center State'
          />
        <input
            className='centerZip'
            value={this.state.Zip}
            onChange={(e) => this.setState({zip: e.target.value})}
            type='text'
            placeholder='Enter Center Zip'
          />
        </div>
        <button
          onClick={() => this._updateCenter()}
        >
          Save
        </button>
      </div>
    )
  }

  _updateCenter = async () => {
    const { _id, name, address, municipality, zip, state } = this.state
    await this.props.updateCenterMutation({
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

const updateCenterMutation = gql`
  mutation UpdateCenter(
    $_id: ID!, 
    $name: String!,
    $address: String!,
    $municipality: String!,
    $state: String!,
    $zip: String!
  ) {
    updateCenter(input: {
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
      center {
        _id
        name
      }
    }    
  }
`
export default graphql(updateCenterMutation, {name: 'updateCenterMutation'})(UpdateCenter) 
