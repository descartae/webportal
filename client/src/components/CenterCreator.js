import React, {Component}  from 'react';
import { gql, graphql } from 'react-apollo';
import { centersListQuery } from './CenterListing';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const centerCreationMutation = gql`
  mutation AddCenter(
    $name: String!,
    $address: String!,
    $municipality: String!,
    $state: String!,
    $zip: String!
  ) {
  addCenter(input: {
    name: $name,
    location: {
      address: $address,
      municipality: $municipality,
      state: $state,
       zip: $zip
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

class CenterCreator extends Component {
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
    await this.props.centerCreationMutation({
      variables: {
        name,
        address,
        municipality,
        zip,
        state
      },
      refetchQueries: [{ query: centersListQuery }]
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
        <strong>Create New Center</strong>
        <form onSubmit={this.onSubmit.bind(this)}>
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

export default graphql(centerCreationMutation, {name: 'centerCreationMutation'})(withRouter(CenterCreator));
