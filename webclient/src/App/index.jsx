import React from 'react';
import {
  Route,
  Switch,
  Link,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import {
  AppAlert,
  Dashboard,
  LoginForm,
  LoginLogoutButton,
} from '../components';
import './App.css';

const App = () => (
  <div className="app">
    <AppAlert />
    <Switch>
      <Route exact path="/login" render={ownProps => <LoginForm {...ownProps} />} />
      <Route exact path="/" render={ownProps => <Dashboard {...ownProps} />} />
    </Switch>
    <div>
      <Tag><Link to="/">Home</Link></Tag>
      <LoginLogoutButton />
    </div>
  </div>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
