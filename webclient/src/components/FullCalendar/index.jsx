import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Calendar } from 'antd';
import { toggleDayRequest } from '../../actions/calendarActions';
import './fullcalendar.css';

class FullCalendar extends Component {
  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(value) {
    const [yyyy, mm, dd] = value.format('YYYY-MM-DD').split('-');
    this.props.toggleDayRequest({ yyyy, mm, dd });
  }

  render() {
    return (
      <div id="full-calendar">
        <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
          <Calendar fullscreen={false} onSelect={this.onSelect} />
        </div>
      </div>
    );
  }
}

FullCalendar.propTypes = {
  toggleDayRequest: PropTypes.func.isRequired,
};

FullCalendar.defaultProps = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  toggleDayRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(FullCalendar);
