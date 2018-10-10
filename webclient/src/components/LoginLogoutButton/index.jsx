import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';
import { logoutRequest } from '../../actions/authActions';

class LoginLogoutButton extends Component {
  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Tag onClick={this.props.logoutRequest}>Logout</Tag>;
    } else {
      return (
        <Link to="/login">
          <Tag>Login</Tag>
        </Link>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const { auth: { isAuthenticated } } = state;

  return {
    isAuthenticated,
  };
};

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginLogoutButton);
