import React from 'react';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  AppAlert,
  Dashboard,
  LogoutButton,
} from '../components';
import './App.css';

const App = () => (
  <div className="app">
    <AppAlert />
    <Switch>
      <Route exact path="/" render={ownProps => <Dashboard {...ownProps} />} />
    </Switch>
    <div>
      <LogoutButton />
    </div>
  </div>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
