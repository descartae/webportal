import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'

import Store from 'material-ui/svg-icons/action/store'

import logo from './../logo.png'

export class AppMenu extends Component {
  constructor (props) {
    super(props)
    this.state = { open: false }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleToggle (event) {
    this.setState({ open: !this.state.open })
  }

  handleClose () {
    this.setState({ open: false })
  }

  render () {
    return (
      <div>

        <AppBar
          title='Descartaê'
          onLeftIconButtonClick={this.handleToggle}
        />

        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <div style={{ textAlign: 'center' }}>
            <img src={logo} className='App-logo' alt='logo' />
          </div>
          <Link to='/facilities'>
            <MenuItem leftIcon={<Store />} primaryText='Estabelecimentos' onClick={this.handleClose} />
          </Link>
        </Drawer>

        {this.props.children}

      </div>
    )
  }
}
