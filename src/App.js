import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/* nota: tem 2 browserRouter. O outro está no index  */}
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => <Home { ...props } /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
