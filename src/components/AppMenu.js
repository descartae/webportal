import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import jwt from 'jsonwebtoken'

import { withRouter } from 'react-router'
import { withStyles } from 'material-ui/styles'

import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import AccountCircle from 'material-ui-icons/AccountCircle'
import Menu, { MenuItem } from 'material-ui/Menu'

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import StoreIcon from 'material-ui-icons/Store'
import PeopleIcon from 'material-ui-icons/People'

import logo from './../logo.png'

import Auth from './Auth'
import ForRole from './ForRole'

class AppMenu extends Component {
  static styles = (theme) => ({
    title: {
      flex: 1,
      color: 'inherit'
    },
    menu: {
      marginLeft: -12,
      marginRight: 20,
      color: 'inherit'
    },
    user: {
      color: 'inherit'
    },
    logo: {
      textAlign: 'center'
    },
    logoImg: {
      width: 80
    }
  })

  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  static childContextTypes = {
    auth: PropTypes.object
  }

  constructor (props) {
    super(props)

    const token = localStorage.getItem('token')
    const hasToken = !!token

    this.state = {
      drawer: false,
      menu: null,
      logged: hasToken,
      data: hasToken ? jwt.decode(token) : null
    }
  }

  getChildContext () {
    return {
      auth: this.state.data
    }
  }

  logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('token_data')
    this.setState({ logged: false })
  }

  toggleDrawer = (event) => {
    this.setState({ drawer: !this.state.drawer })
  }

  setDrawer = (drawer) => () => {
    this.setState({
      drawer
    })
  };

  setMenu = event => {
    this.setState({ menu: event.currentTarget })
  };

  closeMenu = () => {
    this.setState({ menu: null })
  };

  render () {
    const { classes } = this.props
    const { menu, logged } = this.state

    if (!logged) {
      return <Auth />
    }

    return (
      <div>

        <AppBar
          title='Descartaê'
          position='static'
          onClose={this.setDrawer(false)}>

          <Toolbar>
            <IconButton className={classes.menu} onClick={this.toggleDrawer}>
              <MenuIcon />
            </IconButton>

            <Typography className={classes.title} variant='title'>
              Descartaê
            </Typography>

            <IconButton className={classes.user} onClick={this.setMenu}>
              <AccountCircle />
            </IconButton>

            <Menu
              anchorEl={menu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={!!menu}
              onClose={this.closeMenu}>

              <MenuItem onClick={this.logout}>Logout</MenuItem>

            </Menu>

          </Toolbar>

        </AppBar>

        <Drawer
          open={this.state.drawer}
          onClose={this.setDrawer(false)}>

          <div className={classes.logo}>
            <Link to='/'>
              <img src={logo} className={classes.logoImg} alt='Descartaê' />
            </Link>
          </div>

          <Link to='/facilities'>
            <ListItem button>
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText primary='Pontos de Coleta' />
            </ListItem>
          </Link>

          <ForRole roles={['ADMIN']}>
            <Link to='/users'>
              <ListItem button>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary='Usuários' />
              </ListItem>
            </Link>
          </ForRole>
        </Drawer>

        { this.props.children }

      </div>
    )
  }
}

export default withRouter(withStyles(AppMenu.styles, { withTheme: true })(AppMenu))
