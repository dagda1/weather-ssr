import { ForecastActions, ForecastActionTypes } from './types';
import { Reducer } from 'redux';
import { tassign } from 'tassign';
var parse = require('date-fns/parse');
import format from 'date-fns/format';
import { ForecastState } from '../../types/state';

export const initialForecastState: ForecastState = { forecasts: [], loading: false, error: undefined };

export const forecastReducer: Reducer<ForecastState, ForecastActions> = (state = initialForecastState, action) => {
  switch (action.type) {
    case ForecastActionTypes.FORECAST_LOADING: {
      return tassign(state, { loading: true });
    }

    case ForecastActionTypes.FORECAST_ERROR: {
      return tassign(state, { error: action.error });
    }

    case ForecastActionTypes.FORECAST_SUCCESS: {
      return tassign(state, {
        forecasts: action.payload.list.map((forecast) => {
          const date = parse(forecast.dt);
          return {
            id: forecast.dt,
            dateKey: forecast.dt_txt.substring(0, 10),
            date,
            outlook: forecast.weather[0].description,
            icon: forecast.weather[0].icon,
            time: format(date, 'HH:mm')
          };
        }),
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
