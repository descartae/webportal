import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles';

import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import StoreIcon from 'material-ui-icons/Store';

import logo from './../logo.png'

import Auth from './Auth'

class AppMenu extends Component {

  static styles = (theme) => ({
    title: {
      flex: 1,
      color: 'inherit',
    },
    menu: {
      marginLeft: -12,
      marginRight: 20,
      color: 'inherit',
    },
    user: {
      color: 'inherit',
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
  };

  constructor (props) {
    super(props)
    this.state = {
      drawer: false,
      menu: null,
      logged: !!localStorage.getItem('token')
    }
  }

  logout = () => {
    localStorage.removeItem('token')
    this.setState({ logged: false })
  }

  toggleDrawer = (event) => {
    this.setState({ drawer: !this.state.drawer })
  }

  setDrawer = (drawer) => () => {
    this.setState({
      drawer,
    });
  };

  setMenu = event => {
    this.setState({ menu: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ menu: null });
  };

  render () {
    const { classes } = this.props;
    const { menu } = this.state;

    if (!localStorage.getItem('token')) {
      return <Auth {...this.props} />
    }

    return (
      <div>

        <AppBar
          title='Descartaê'
          position="static"
          onClose={this.setDrawer(false)}>

          <Toolbar>
            <IconButton className={classes.menu} onClick={this.toggleDrawer}>
              <MenuIcon />
            </IconButton>

            <Typography className={classes.title} type="title">
              Descartaê
            </Typography>

            <IconButton className={classes.user} onClick={this.setMenu}>
              <AccountCircle />
            </IconButton>

            <Menu
              id="AppMenu-UserMenu"
              anchorEl={menu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
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
            <img src={logo} className={classes.logoImg} alt='Descartaê' />
          </div>

          <Link to='/facilities'>
            <ListItem button>
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText primary="Pontos de Coleta" />
            </ListItem>
          </Link>
        </Drawer>

        {this.props.children}

      </div>
    )
  }
}

export default withStyles(AppMenu.styles, { withTheme: true })(AppMenu);