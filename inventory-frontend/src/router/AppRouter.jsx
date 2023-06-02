/**
 * @module AppRouter
 */

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ProductsList from '../components/pages/products/ProductsList'
import CreateProduct from '../components/pages/products/CreateProduct';
import RouteNotFound from '../components/pages/RouteNotFound';
import Header from '../components/common/Header';

/**
 * `AppRouter` is a functional component that sets up the routes of the application. 
 * It uses React Router DOM to define a `BrowserRouter`, `Switch`, `Route`, and `Redirect` components 
 * to handle routing.
 *
 * @function AppRouter
 * @returns {JSX.Element} The rendered AppRouter component.
 */

const AppRouter = () => {
  return (
    <Router>
    <Header />
    <Switch>
      <Redirect exact from="/" to="/products" />
      <Route path="/products" component={ProductsList} />
      <Route path="/new" component={CreateProduct} />
      <Route component={RouteNotFound} />
    </Switch>
  </Router>
  );
}

export default AppRouter;