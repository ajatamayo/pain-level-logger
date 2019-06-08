import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { ResponsiveLine } from '@nivo/line';

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


const NiceGraph = (props) => {
  // eslint-disable-next-line react/prop-types
  const { dates } = props;
  const datesList = Object.keys(dates);
  const firstDate = datesList[0];
  const lastDate = datesList[datesList.length - 1];
  const allDates = enumerateDays(firstDate, lastDate);
  const formattedData = allDates.map(d => ({ x: d, y: dates[d] || 0 }));
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
    <div style={{ height: 400 }}>
      <ResponsiveLine
        data={data}
        margin={{
          top: 50, right: 20, bottom: 50, left: 30,
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
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh
        gridYValues={[0, 10]}
        colors={['#1890ff']}
      />
    </div>
  );
};

const mapStateToProps = state => ({ dates: state.calendar.dates });

export default connect(mapStateToProps)(NiceGraph);
