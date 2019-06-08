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
  Graph,
  RedirectToUrl,
} from '../components';
import './App.css';

const App = () => (
  <div className="app">
    <AppAlert />
    <Switch>
      <Route exact path="/graph" render={ownProps => <Graph {...ownProps} />} />
      <Route exact path="/:encodedPk" render={ownProps => <RedirectToUrl {...ownProps} />} />
      <Route exact path="/" render={ownProps => <Dashboard {...ownProps} />} />
    </Switch>
  </div>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
