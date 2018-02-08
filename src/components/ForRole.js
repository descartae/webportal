import { Component } from 'react'
import PropTypes from 'prop-types'

class ForRole extends Component {
  static contextTypes = {
    auth: PropTypes.object.isRequired
  }

  render () {
    const { roles: wantedRoles, children } = this.props
    const { auth: { roles } } = this.context

    let found = false
    for (const role of wantedRoles) {
      if (roles.indexOf(role) > -1) {
        found = true
      }
    }

    return found ? children : null
  }
}

export default ForRole
