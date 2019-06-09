import moment from 'moment';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ResponsiveLine } from '@nivo/line';
import { InputNumber } from 'antd';
import './nicegraph.css';

const DEFAULT_DAYS_TO_SHOW = 60;

const enumerateDays = (startDate, endDate) => {
  if (!startDate || !endDate) return [];

  const dates = [];

  const currDate = moment(startDate).startOf('day');
  const lastDate = moment(endDate).startOf('day');

  dates.push(currDate.clone());

  while (currDate.add(1, 'days').diff(lastDate) < 0) {
    dates.push(currDate.clone());
  }

  dates.push(lastDate.clone());

  return dates.map(d => d.format('YYYYMMDD'));
};


class NiceGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      daysToShow: DEFAULT_DAYS_TO_SHOW,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(newValue) {
    const value = newValue || 0;
    this.setState({ daysToShow: value === 0 ? 0 : Math.max(value, 4) });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { dates } = this.props;
    const datesList = Object.keys(dates);
    const firstDate = datesList[0];
    const lastDate = datesList[datesList.length - 1];
    const allDates = enumerateDays(firstDate, lastDate);
    const datesToShow = allDates.slice(-this.state.daysToShow);
    const formattedData = datesToShow.map(d => ({ x: d, y: dates[d] || 0 }));
    if (!formattedData.length) {
      return null;
    }

    const data = [
      {
        id: 'Pain level',
        color: '#1890ff',
        data: formattedData,
      },
    ];

    return (
      <Fragment>
        <div className="days-to-show">
          <span>Show the last</span>
          <InputNumber min={10} defaultValue={DEFAULT_DAYS_TO_SHOW} onChange={this.onChange} size="large" />
          <span>days:</span>
        </div>
        <div style={{ height: 400 }}>
          <ResponsiveLine
            data={data}
            margin={{
              top: 25, right: 20, bottom: 50, left: 30,
            }}
            xScale={{ type: 'time', format: '%Y%m%d', precision: 'day' }}
            xFormat="time:%Y%m%d"
            curve="monotoneX"
            yScale={{
              type: 'linear', stacked: true, min: 0, max: 11,
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              format: '%b %d',
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            gridYValues={[0, 5, 10]}
            colors={['#1890ff']}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ dates: state.calendar.dates });

export default connect(mapStateToProps)(NiceGraph);
