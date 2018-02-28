import React, { Component } from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

import {
  AppMenu
} from './components'

import {
  Home,
  Facility,
  User
} from './containers'

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo'

import { MuiThemeProvider } from 'material-ui/styles'
import Theme from './Theme'

const networkInterface = createNetworkInterface({
  uri: process.env.REACT_APP_SERVER_URL
})
networkInterface.use([{
  applyMiddleware (req, next) {
    // setTimeout(next, 500)
    next()
  }
}, {
  applyMiddleware (req, next) {
    req.request.server = req.request.query.server

    if (!req.options.headers) {
      req.options.headers = {}
    }

    const token = localStorage.getItem('token')
    req.options.headers.authorization = token ? `Bearer ${token}` : null
    next()
  }
}])

function dataIdFromObject (result) {
  if (result && result.__typename) {
    if (result._id !== undefined) {
      return `${result.__typename}:${result._id}`
    }
  }
  return null
}

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject
})

class App extends Component {
  render () {
    return (
      <MuiThemeProvider theme={Theme}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <AppMenu>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/facilities' component={Facility} />
                <Route path='/users' component={User} />
              </Switch>
            </AppMenu>
          </BrowserRouter>
        </ApolloProvider>
      </MuiThemeProvider>
    )
  }
}

export default App
