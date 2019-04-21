import { State } from '../../types/state';
import { createSelector } from 'reselect';

export const getForecastState = (state: State) => state.forecast;

export const isLoadingSelector = createSelector(
  getForecastState,
  (forecastState) => forecastState.loading
);

export const errorSelector = createSelector(
  getForecastState,
  (forecastState) => forecastState.error
);

export const forecastSelector = createSelector(
  getForecastState,
  (forecastState) => forecastState.forecasts
);
