import React, {Component}  from 'react'
import { gql, graphql } from 'react-apollo'
import { centersListQuery } from './CenterListing'

{/* 
TODO: Fix issues with routing after saving the form 
Notes: Import the following to redirect user after Submit. However, props.router is undefined 
---------------------------------------------------------------------------------------------
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

------------ 

OLD EXAMPLE 
const centerCreationMutation = gql`
  mutation AddCenter($name: String!) {
    addCenter(name: $name) {
      success
    }
  }
`

const CenterCreator = ({ mutate }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      evt.persist()

      const variables = { name: evt.target.value }

      mutate({
        variables,
        refetchQueries: [{ query: centersListQuery }]
      })
        .then(({ data }) => {
          evt.target.value = ''

          console.log(`Result: \n${JSON.stringify(data, null, 2)}`)
        })
    }
  }

  return (
    <input
      type='text'
      placeholder='New Center'
      onKeyUp={handleKeyUp}
      />
  )
}

export { centerCreationMutation, CenterCreator }
export const CenterCreatorWithData = graphql(centerCreationMutation)(CenterCreator) 

*/}

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
  {/* 
    this.props.router.push('/'); */}
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

{/* 
export default graphql(centerCreationMutation, {name: 'centerCreationMutation'})(withRouter(CenterCreator)); */} 
export default graphql(centerCreationMutation, {name: 'centerCreationMutation'})(CenterCreator)
