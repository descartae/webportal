import React, { Component } from 'react'
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import './App.css'
import logo from './logo.png';
import { CenterListing, CenterDetails, CenterCreator } from './components'

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  toIdValue,
} from 'react-apollo';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const networkInterface = createNetworkInterface({
  uri: process.env.REACT_APP_SERVER_URL
});
networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}]);

function dataIdFromObject (result) {
  if (result.__typename) {
    if (result.id !== undefined) {
      return `${result.__typename}:${result.id}`;
    }
  }
  return null;
}

const client = new ApolloClient({
  networkInterface,
  customResolvers: {
    Query: {
      center: (_, args) => {
        return toIdValue(dataIdFromObject({ __typename: 'Center', id: args['id'] }))
      },
    },
  },
  dataIdFromObject,
});

class App extends Component {

  render () {
    return (
    <MuiThemeProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className='App'>
             <Link to="/" className="navbar"><img src={logo} className="App-logo" alt="logo" /> Descartaê</Link>
              <Switch>
                <Route exact path='/new' component={CenterCreator} />
                <Route exact path="/" component={CenterListing}/>
                <Route path="/centers/:centerId" component={CenterDetails}/>
              </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    </MuiThemeProvider> 
    )
  }
}

export default App
