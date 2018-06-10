import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import jwt from 'jsonwebtoken'

import { withRouter } from 'react-router'
import { withStyles } from 'material-ui/styles'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import AccountCircle from 'material-ui-icons/AccountCircle'
import Menu, { MenuItem } from 'material-ui/Menu'

import { ListItemIcon, ListItemText } from 'material-ui/List'
import StoreIcon from 'material-ui-icons/Store'
import PeopleIcon from 'material-ui-icons/People'
import PersonIcon from 'material-ui-icons/Person'

import logo from '../logo-landscape-white.png'

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
      width: 150
    },
    menuButton: {
      margin: theme.spacing.unit,
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

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = event => {
    if (this.target1.contains(event.target) || this.target2.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  setMenu = (event) => {
    this.setState({ menu: event.currentTarget })
  };

  closeMenu = () => {
    this.setState({ menu: null })
  };

  render () {
    const { classes } = this.props
    const { data, menu, logged } = this.state
    
    if (!logged) {
      return <Auth />
    }

    return (
      <div>

        <AppBar
          title='Descartaê'
          position='static'
        >

          <Toolbar>

          <IconButton size="large" className={classes.user} onClick={this.setMenu}>
            <MenuIcon/>
          </IconButton>

          <div className={classes.logo}>
            <Link to='/'>
              <img src={logo} className={classes.logoImg} alt='Descartaê' />
            </Link>
          </div>

            <Menu
              anchorEl={menu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={!!menu}
              onClose={this.closeMenu}>

              <MenuItem component={Link} to='/facilities'>
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary='Pontos de Coleta' />
              </MenuItem>
              <ForRole roles={['ADMIN']}>
                <MenuItem component={Link} to='/users'>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary='Usuários' />
                </MenuItem>
              </ForRole>
              <MenuItem component={Link} to={`/users/view/${data.id}`}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary='Minha conta' />
              </MenuItem>
              <MenuItem onClick={this.logout}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary='Logout' />
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        { this.props.children }

      </div>
    )
  }
}

export default withRouter(withStyles(AppMenu.styles, { withTheme: true })(AppMenu))
