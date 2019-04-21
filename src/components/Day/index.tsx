import React from 'react';
import { WeatherDate, Weather } from '../../types/forecast';
import { connect } from 'react-redux';
import { summarySelector } from '../../containers/Home/selectors';
import format from 'date-fns/format';
const parse = require('date-fns/parse');

const styles = require('./Day.scss');

interface StateProps {
  summary: Weather;
}

interface OwnProps {
  date: WeatherDate;
}

export type DayProps = OwnProps & StateProps;

const getIconSrc = (icon: string) => `http://openweathermap.org/img/w/${icon}.png`;

export const DayView: React.FunctionComponent<DayProps> = ({ date: { id }, summary: { outlook, date, icon } }) => {
  const formattedDate = format(parse(date), 'DD MMMM YYYY');
  return (
    <div key={id} className={styles.row}>
      <div>
        <img alt={`${outlook} at ${formattedDate}`} src={getIconSrc(icon)} />
      </div>
      <div>{outlook}</div>
      <div>{formattedDate}</div>
    </div>
  );
};

export const Day = connect<StateProps, {}, OwnProps>((state, props) => ({
  summary: summarySelector(state, props)
}))(DayView);
