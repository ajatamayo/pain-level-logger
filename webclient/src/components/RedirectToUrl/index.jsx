import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { decodeUrlRequest } from '../../actions/shortenerActions';

class RedirectToUrl extends Component {
  componentDidMount() {
    const { match: { params: { encodedPk } } } = this.props;
    this.props.decodeUrlRequest(encodedPk);
  }

  render() {
    const { redirectUrl } = this.props;
    if (redirectUrl) {
      return (
        <p>{`Redirecting you to ${redirectUrl}`}</p>
      );
    }
    return (
      <p>Redirecting you to...</p>
    );
  }
}

RedirectToUrl.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  decodeUrlRequest: PropTypes.func.isRequired,
  redirectUrl: PropTypes.string,
};

RedirectToUrl.defaultProps = {
  redirectUrl: '',
};

const mapStateToProps = (state) => {
  const { shortener: { redirectUrl } } = state;

  return {
    redirectUrl,
  };
};

const mapDispatchToProps = {
  decodeUrlRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(RedirectToUrl);
