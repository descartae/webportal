import React from 'react';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

export default class FacilityPage extends React.Component {


  static fragments = {
    facility: gql`
      fragment FacilityPageFacility on Facility {
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
    `
  }

  static propTypes = {
    facility: propType(FacilityPage.fragments.facility).isRequired,
    handleCancel: PropTypes.func.isRequired,
  }

  render () {
    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }}>
          <input
            className='w-100 pa3 mv2'
            value={this.props.facility.name}
            placeholder='Name'
            readOnly={true}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.props.facility.location.address}
            placeholder='Image Url'
            readOnly={true}
          />
          }
          <div className='flex justify-between'>
            <button onClick={this.props.handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}; 
