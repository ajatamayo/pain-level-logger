import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
import qs from 'query-string';
import { loginRequest, logincodeRequest } from '../../actions/authActions';

const FormItem = Form.Item;

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.emailInput = null;
    this.codeInput = null;

    this.setEmailInputRef = (element) => {
      this.emailInput = element;
    };

    this.setCodeInputRef = (element) => {
      this.codeInput = element;
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err) => {
      if (!err) {
        const email = this.emailInput.input.value;
        const code = this.codeInput && this.codeInput.input.value;
        if (!this.props.uid) {
          this.props.logincodeRequest(email);
        } else {
          const { uid } = qs.parse(this.props.location.search);
          this.props.loginRequest(code, this.props.uid || uid);
        }
      }
    });
  }

  render() {
    const { code, uid } = qs.parse(this.props.location.search);
    if (code && uid) {
      this.props.loginRequest(code, uid);
      return <p>Logging you in...</p>;
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h1>Login</h1>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(<Input
            ref={this.setEmailInputRef}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="you@email.com"
            type="email"
          />)}
        </FormItem>
        {this.props.uid && (
          <FormItem>
            {getFieldDecorator('code', {
              rules: [{ required: true, message: 'Please input your login code!' }],
            })(<Input
              ref={this.setCodeInputRef}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Paste your-temporary-login-code"
            />)}
          </FormItem>
        )}
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  logincodeRequest: PropTypes.func.isRequired,
  loginRequest: PropTypes.func.isRequired,
  uid: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  form: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
};

LoginForm.defaultProps = {
  uid: '',
};

const mapStateToProps = (state) => {
  const { auth: { logincode: { uid } } } = state;
  return {
    uid,
  };
};

const mapDispatchToProps = {
  loginRequest,
  logincodeRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LoginForm));
