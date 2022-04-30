import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetail from './pages/ProductDetail';
import CartCounter2 from './components/CartCounter2';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <CartCounter2 />
        {/* nota: tem 2 browserRouter. O outro está no index  */}
        <Switch>
          <Route
            exact
            path="/"
            component={ Home }
          />
          <Route
            path="/shoppingCart"
            component={ ShoppingCart }
          />
          <Route
            path="/productDetail/:id"
            render={ (props) => <ProductDetail { ...props } /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
