import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FullCalendar from '../FullCalendar';
import LogoutButton from '../LogoutButton';
import LoginForm from '../LoginForm';

const Dashboard = props => (
  <Fragment>
    <h1>tn pain log</h1>
    {props.isAuthenticated ? (
      <Fragment>
        <FullCalendar />
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
