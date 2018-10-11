import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import { logoutRequest } from '../../actions/authActions';

const LogoutButton = (props) => {
  const { isAuthenticated } = props;
  if (isAuthenticated) {
    return (
      <div style={{ paddingTop: '80px' }}>
        <Tag onClick={props.logoutRequest} style={{ marginRight: 0 }}>Logout</Tag>
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
