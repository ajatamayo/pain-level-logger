import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Slider, Icon } from 'antd';
import './iconslider.css';

class IconSlider extends Component {
  state = {
    value: 0,
  };

  handleChange = (value) => {
    this.setState({ value });
    if (this.props.handleChange) {
      this.props.handleChange(value);
    }
  };

  render() {
    const { max, min } = this.props;
    const { value } = this.state;
    const mid = ((max - min) / 2).toFixed(5);
    const preColor = value >= mid ? '' : 'rgba(0, 0, 0, .45)';
    const nextColor = value >= mid ? 'rgba(0, 0, 0, .45)' : '';
    return (
      <div className="icon-wrapper">
        <Icon style={{ color: preColor }} type="frown-o" />
        <Slider {...this.props} onChange={this.handleChange} value={value} />
        <Icon style={{ color: nextColor }} type="smile-o" />
      </div>
    );
  }
}

IconSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  handleChange: PropTypes.func,
};

IconSlider.defaultProps = {
  handleChange: null,
};

export default IconSlider;
