import React, { Fragment } from 'react';
import LoginForm from '../LoginForm';
import Shortener from '../Shortener';
import LogoutButton from '../LogoutButton';

const Dashboard = () => (
  <Fragment>
    <h1>aqwi.re url shortener</h1>
    <LoginForm />
    <Shortener />
    <LogoutButton />
  </Fragment>
);

export default Dashboard;
