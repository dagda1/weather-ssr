import React from 'react';
import { WeatherDate, Weather } from '../../types/forecast';
import { connect } from 'react-redux';
import { summarySelector } from '../../containers/Home/selectors';
import format from 'date-fns/format';
import { parse } from 'date-fns';

const styles = require('./Day.scss');

interface StateProps {
  summary: Weather;
}

interface OwnProps {
  date: WeatherDate;
}

export type DayProps = OwnProps & StateProps;

const getIconSrc = (icon: string) => `http://openweathermap.org/img/w/${icon}.png`;

export const DayView: React.FunctionComponent<DayProps> = ({ date: { id }, summary: { outlook, dateKey, icon } }) => {
  const formattedDate = format(parse(dateKey, 'yyyy-MM-dd', new Date()), 'dd MMMM yyyy');
  return (
    <div key={id} className={styles.row}>
      <div>{formattedDate}</div>
      <div>
        <img alt={`${outlook} at ${formattedDate}`} src={getIconSrc(icon)} />
      </div>
      <div className={styles.detail}>{outlook}</div>
    </div>
  );
};

export const Day = connect<StateProps, {}, OwnProps>((state, props) => ({
  summary: summarySelector(state, props)
}))(DayView);
