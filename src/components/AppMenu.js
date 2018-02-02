import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'

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
          iconClassNameRight='muidocs-icon-navigation-expand-more'
          onLeftIconButtonClick={this.handleToggle}
        />

        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <div style={{ textAlign: 'center' }}>
            <img src={logo} className='App-logo' alt='logo' />
          </div>
          <Link to='/facilities'>
            <MenuItem onClick={this.handleClose}>Estabelecimentos</MenuItem>
          </Link>
        </Drawer>

        {this.props.children}

      </div>
    )
  }
}
