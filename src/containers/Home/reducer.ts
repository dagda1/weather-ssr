import { ForecastActions, ForecastActionTypes } from './types';
import { Reducer } from 'redux';
import { tassign } from 'tassign';
import { ForecastState } from '../../types/state';
import groupBy from 'lodash.groupby';
import format from 'date-fns/format';

const { fromUnixTime } = require('date-fns');

export const initialForecastState: ForecastState = { forecast: undefined, loading: false, error: undefined };

export const forecastReducer: Reducer<ForecastState, ForecastActions> = (state = initialForecastState, action) => {
  switch (action.type) {
    case ForecastActionTypes.FORECAST_LOADING: {
      return tassign(state, { loading: true });
    }

    case ForecastActionTypes.FORECAST_ERROR: {
      return tassign(state, { error: action.error });
    }

    case ForecastActionTypes.FORECAST_SUCCESS: {
      const days = groupBy(action.payload.list, (day) => day.dt_txt.substring(0, 10));

      return tassign(state, {
        forecast: {
          city: action.payload.city.name,
          dates: Object.keys(days)
            .slice(0, 5) // we only want 5 days
            .map((date) => ({
              id: date,
              date
            })),
          forecasts: action.payload.list.map((forecast) => {
            const date = fromUnixTime(forecast.dt);
            return {
              id: forecast.dt,
              dateKey: forecast.dt_txt.substring(0, 10),
              date,
              outlook: forecast.weather[0].description,
              icon: forecast.weather[0].icon,
              time: format(date, 'HH:mm')
            };
          })
        },
        loading: false,
        error: undefined
      });
    }

    case ForecastActionTypes.FORECAST_CLEAR: {
      return { ...initialForecastState };
    }

    default:
      return state;
  }
};
