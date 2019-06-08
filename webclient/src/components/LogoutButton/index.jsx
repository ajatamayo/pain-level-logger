import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { logoutRequest } from '../../actions/authActions';

const LogoutButton = (props) => {
  const { isAuthenticated } = props;
  if (isAuthenticated) {
    return (
      <div style={{ paddingTop: '20px' }}>
        <Button
          onClick={props.logoutRequest}
          style={{ marginRight: 0 }}
          size="small"
        >
          Logout
        </Button>
      </div>
    );
  }
  return null;
};

LogoutButton.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logoutRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { auth: { isAuthenticated } } = state;

  return {
    isAuthenticated,
  };
};

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
