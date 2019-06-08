import { get } from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Calendar, Modal } from 'antd';
import { toggleDayRequest, getDatesRequest } from '../../actions/calendarActions';
import { IconSlider } from '..';
import './fullcalendar.css';

class FullCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      date: null,
      value: null,
    };

    this.onSelect = this.onSelect.bind(this);
    this.dateCellRender = this.dateCellRender.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  componentDidMount() {
    this.props.getDatesRequest();
  }

  onSelect(value) {
    this.setState({
      modalVisible: true,
      date: value,
    });
  }

  dateCellRender(value) {
    // eslint-disable-next-line react/prop-types
    const { dates } = this.props;
    const level = get(dates, value.format('YYYYMMDD'), 0);
    if (level > 0) {
      return <p>{level}</p>;
    }
    return null;
  }

  handleCancel() {
    this.setState({
      modalVisible: false,
      date: null,
    });
  }

  handleOk() {
    // this.setState({ modalVisible: false });
    const [yyyy, mm, dd] = this.state.date.format('YYYY-MM-DD').split('-');
    this.props.toggleDayRequest({ yyyy, mm, dd }, this.state.value);
  }

  render() {
    return (
      <div id="full-calendar">
        <div style={{ width: 400, border: '1px solid #d9d9d9', borderRadius: 4 }}>
          <Calendar
            fullscreen={false}
            onSelect={this.onSelect}
            dateCellRender={this.dateCellRender}
          />
          <Modal
            visible={this.state.modalVisible}
            onCancel={this.handleCancel}
            onOk={this.handleOk}
            title={this.state.date ? this.state.date.format('LL') : null}
          >
            {this.state.date && (
              <IconSlider min={0} max={10} handleChange={value => this.setState({ value })} />
            )}
          </Modal>
        </div>
      </div>
    );
  }
}

FullCalendar.propTypes = {
  toggleDayRequest: PropTypes.func.isRequired,
  getDatesRequest: PropTypes.func.isRequired,
};

FullCalendar.defaultProps = {};

const mapStateToProps = state => ({ dates: state.calendar.dates });

const mapDispatchToProps = {
  toggleDayRequest,
  getDatesRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(FullCalendar);
