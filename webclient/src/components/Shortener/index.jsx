import { get } from 'lodash';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button, Form, Icon, Input, Tooltip,
} from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { shortenUrlRequest } from '../../actions/shortenerActions';
import './shortener.css';

const FormItem = Form.Item;

class Shortener extends Component {
  constructor(props) {
    super(props);

    this.urlInput = null;

    this.setUrlInputRef = (element) => {
      this.urlInput = element;
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.urlInput) {
      this.urlInput.focus();
    }
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
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit} layout="inline" className="shortener-form">
          <p>{`Welcome, ${this.props.displayName}! Enter a url to shorten :)`}</p>
          <FormItem className="url-input-form-item">
            {getFieldDecorator('url', {
              rules: [{ required: true, message: 'You know you need a url right? :/' }],
            })(<Input
              ref={this.setUrlInputRef}
              prefix={<Icon type="global" />}
              placeholder="https://aqwire.io"
              disabled={this.props.isFetching}
            />)}
          </FormItem>
          <FormItem className="shortener-button-form-item">
            <Button type="primary" htmlType="submit" className="shortener-form-button">
              Get shortlink!
            </Button>
          </FormItem>
        </Form>
        {!!this.props.urlPairs.length && (
          <div className="urls">
            {this.props.urlPairs.map(item => (
              <div key={item.pk} className="url">
                <div className="long-url">
                  {item.longUrl}
                </div>
                <div className="short-url">
                  <span className="display">{item.shortUrl}</span>
                  <CopyToClipboard text={item.shortUrl}>
                    <Tooltip trigger="click" title={`Copied ${item.shortUrl} to clipboard!`}>
                      <Button ghost type="primary" size="small" icon="copy">
                        Copy
                      </Button>
                    </Tooltip>
                  </CopyToClipboard>
                </div>
              </div>
            ))}
          </div>
        )}
      </Fragment>
    );
  }
}

Shortener.propTypes = {
  shortenUrlRequest: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  form: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  urlPairs: PropTypes.arrayOf(PropTypes.shape({
    pk: PropTypes.number.isRequired,
    longUrl: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
  })).isRequired,
  displayName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { shortener: { urlPairs, isFetching } } = state;
  const displayName = get(state, 'auth.user.user.displayName');

  return {
    urlPairs,
    isFetching,
    displayName,
  };
};

const mapDispatchToProps = {
  shortenUrlRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Shortener));
