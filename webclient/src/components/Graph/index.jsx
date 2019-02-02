import { groupBy, range } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import tweets from './tweets';
import './graph.css';

const DATE_FORMAT = 'YYYY-MM-DD';

const Graph = () => {
  const groupedTweets = groupBy(tweets, tweet => tweet.created_at.slice(0, 10));
  const dates = Object.keys(groupedTweets).sort();
  const firstDate = moment(dates[0], DATE_FORMAT);
  const lastDate = moment(dates[dates.length - 1], DATE_FORMAT);
  const monthCount = moment(lastDate).startOf('month').diff(moment(firstDate).startOf('month'), 'months') + 1;
  const daysCount = moment(lastDate).diff(moment(firstDate), 'days') + 1;
  return (
    <div id="bar-chart">
      <div className="graph">
        <ul className="x-axis">
          {range(monthCount).map(i => (
            <li key={i} style={{ width: `${100 / monthCount}%` }}>
              <span>
                {moment(firstDate).add(i, 'months').format('YYYY MM')}
              </span>
            </li>
          ))}
        </ul>
        <ul className="y-axis">
          <li><span>20</span></li>
          <li><span>15</span></li>
          <li><span>10</span></li>
          <li><span>5</span></li>
          <li><span>0</span></li>
        </ul>
        <div className="bars">
          {range(1, daysCount + 1).map((i) => {
            const thisDay = moment(firstDate).add(i, 'days').format(DATE_FORMAT);
            const tweetsThisDay = groupedTweets[thisDay];
            if (tweetsThisDay) {
              return (
                <div key={i} className="bar-group" style={{ width: `${100 / daysCount}%` }}>
                  <div className="bar bar-1 stat-1" style={{ height: `${100 * tweetsThisDay.length / 20}%` }}>
                    <span>{thisDay}</span>
                  </div>
                </div>
              );
            }
            return (
              <div key={i} className="bar-group" style={{ width: `${100 / daysCount}%` }} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

Graph.propTypes = {};

Graph.defaultProps = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
