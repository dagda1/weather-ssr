import React from 'react';
import { Forecast } from '../../types/forecast';
import { forecastSelector } from '../Home/selectors';
import { connect } from 'react-redux';
import { State } from '../../types/state';
import { push } from 'connected-react-router';
import * as Urls from '../../urls';
import { ApplicationLayout } from '../../layouts/ApplicationLayout';
import { Day } from '../../components/Day';
import { Button, ButtonStyle } from '@cutting/component-library';
import { clearState } from '../Home/actions';

export interface ForecastViewProps {
  forecast: Forecast;
  goHome: () => void;
  clear: () => void;
}

export class ForecastView extends React.Component<ForecastViewProps> {
  componentDidMount() {
    const { forecast, goHome } = this.props;

    if (!forecast) {
      goHome();
    }
  }

  clickHandler = () => {
    const { goHome, clear } = this.props;

    clear();
    goHome();
  };

  render() {
    const { forecast } = this.props;

    if (!forecast) {
      return null;
    }

    const { city, dates } = forecast;

    return (
      <ApplicationLayout heading={city}>
        {dates.map((date) => (
          <Day key={date.id} date={date} />
        ))}
        <Button type="button" onClick={this.clickHandler} buttonStyle={ButtonStyle.Primary}>
          Back
        </Button>
      </ApplicationLayout>
    );
  }
}

export const ConnectedForecast = connect<Pick<ForecastViewProps, 'forecast'>, {}, {}, State>(
  (state) => ({
    forecast: forecastSelector(state)
  }),
  (dispatch) => ({
    goHome: () => dispatch(push(Urls.Home)),
    clear: () => dispatch(clearState)
  })
)(ForecastView);
