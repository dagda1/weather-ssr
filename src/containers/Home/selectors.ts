import { State } from '../../types/state';
import { createSelector } from 'reselect';
import { WeatherDate } from '../../types/forecast';

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
  (forecastState) => forecastState.forecast
);
export const forecastsSelector = createSelector(
  forecastSelector,
  (forecast) => forecast.forecasts
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectedDateSelector = (_: any, props: { date: WeatherDate }) => props.date;

export const detailSelector = createSelector(
  [selectedDateSelector, forecastsSelector],
  (selectedDate, forecasts) => {
    return forecasts.filter((x) => {
      return x.dateKey === selectedDate.date;
    });
  }
);

export const summarySelector = createSelector(
  [detailSelector, forecastsSelector],
  (details, forecasts) => {
    if (forecasts.length === 0) {
      return undefined;
    }

    return details[0];
  }
);
