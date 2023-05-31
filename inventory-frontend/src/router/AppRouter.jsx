import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ProductsList from '../components/pages/products/ProductsList'
import CreateProduct from '../components/pages/products/CreateProduct';
import RouteNotFound from '../components/pages/RouteNotFound';
import Header from '../components/common/Header';

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