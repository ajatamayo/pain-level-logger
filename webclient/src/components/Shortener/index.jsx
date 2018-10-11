import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button, Form, Icon, Input,
} from 'antd';
import { shortenUrlRequest } from '../../actions/shortenerActions';

const FormItem = Form.Item;

class Shortener extends Component {
  constructor(props) {
    super(props);

    this.urlInput = null;
    this.codeInput = null;

    this.setUrlInputRef = (element) => {
      this.urlInput = element;
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err) => {
      if (!err) {
        const url = this.urlInput.input.value;
        this.props.shortenUrlRequest(url);
      }
    });
  }

  render() {
    const { isAuthenticated } = this.props;
    const { getFieldDecorator } = this.props.form;
    if (!isAuthenticated) {
      return null;
    }
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <p>Enter a url to shorten :)</p>
          <FormItem>
            {getFieldDecorator('url', {
              rules: [{ required: true, message: 'You know you need a url right? :/' }],
            })(<Input
              ref={this.setUrlInputRef}
              prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="https://aqwire.io"
              disabled={this.props.isFetching}
            />)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Get shortlink!
            </Button>
          </FormItem>
        </Form>
        {this.props.urlPairs.map(item => (
          <p key={item.pk}>
            {item.longUrl}
            <Icon type="arrow-right" />
            {item.shortUrl}
            <Icon type="copy" />
          </p>
        ))}
      </Fragment>
    );
  }
}

Shortener.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  shortenUrlRequest: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  form: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  urlPairs: PropTypes.arrayOf(PropTypes.shape({
    pk: PropTypes.number.isRequired,
    longUrl: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => {
  const { auth: { isAuthenticated } } = state;
  const { shortener: { urlPairs, isFetching } } = state;

  return {
    isAuthenticated,
    urlPairs,
    isFetching,
  };
};

const mapDispatchToProps = {
  shortenUrlRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Shortener));
