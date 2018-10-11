import { get } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'antd';
import { appAlertClear } from '../../actions/appActions';
import './appalert.css';

class AppAlert extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.appAlertClear();
  }

  render() {
    let message;
    let alertType;
    if (401 === get(this, 'props.error.response.status')) {
      message = 'Please login.';
      alertType = 'warning';
    }

    if (this.props.message == null) return false;

    return (
      <div className="alert-wrapper">
        <Alert
          message={message || this.props.message}
          type={alertType || this.props.alertType}
          showIcon
          banner
          closable
          afterClose={this.handleClose}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { app: { message, alertType, error } } = state;
  return {
    message,
    alertType,
    error,
  };
};

const mapDispatchToProps = {
  appAlertClear,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppAlert);
