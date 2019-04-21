import React from 'react';
import { ApplicationLayout } from '../../layouts/ApplicationLayout';
import { WeatherSelectorForm } from '../../components/WeatherSelectorForm';
import { connect } from 'react-redux';
import { queryForecast } from './actions';
import { QueryForecast } from './types';
import { isLoadingSelector, forecastSelector } from '../../containers/Home/selectors';
import { errorSelector } from '../../containers/Home/selectors';
import { State } from '../../types/state';
import { Forecast } from '../../types/forecast';
import * as Urls from '../../urls';
import { push } from 'connected-react-router';

const styles = require('./Home.scss');

export interface HomeProps {
  query: QueryForecast;
  goToResults: () => void;
}

interface StoreState {
  loading: boolean;
  error: string | undefined;
  forecasts: Forecast[];
}

type Props = HomeProps & StoreState;

export class HomeView extends React.Component<Props> {
  componentDidUpdate(prevProps: Props) {
    if (prevProps === this.props) {
      return;
    }

    if (prevProps.forecasts.length === 0 && this.props.forecasts.length > 0) {
      props.goToResults();
    }
  }

  render() {
    const { query, error, loading } = this.props;

    return (
      <ApplicationLayout heading="Choose your city">
        <div className={styles.main}>
          <WeatherSelectorForm query={query} error={error} loading={loading} />
        </div>
      </ApplicationLayout>
    );
  }
}

export const Home = connect(
  (state: State) => ({
    loading: isLoadingSelector(state),
    error: errorSelector(state),
    forecasts: forecastSelector(state)
  }),
  (dispatch) => {
    return {
      query: (city: string) => dispatch(queryForecast(city)),
      goToResults: () => push(Urls.Forecast)
    };
  }
)(HomeView);
