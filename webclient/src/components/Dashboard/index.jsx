import React, { Fragment } from 'react';
import { LoginForm, Shortener } from '..';

const Dashboard = () => (
  <Fragment>
    <h1>aqwi.re url shortener</h1>
    <LoginForm />
    <Shortener />
  </Fragment>
);

export default Dashboard;
