import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from '../LoginForm';
import Shortener from '../Shortener';
import LogoutButton from '../LogoutButton';

const Dashboard = props => (
  <Fragment>
    <h1>aqwi.re url shortener</h1>
    {props.isAuthenticated ? (
      <Fragment>
        <Shortener />
        <LogoutButton />
      </Fragment>
    ) : (
      <LoginForm />
    )}
  </Fragment>
);

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { auth: { isAuthenticated } } = state;

  return {
    isAuthenticated,
  };
};

export default connect(mapStateToProps)(Dashboard);
