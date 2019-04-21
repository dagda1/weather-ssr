import { ApiActionTypes, ApiAction } from '../../store/middleware';
import { ForecastActionTypes, ForecastClear } from './types';

export const queryForecast = (city: string): ApiAction<ForecastActionTypes> => ({
  type: ApiActionTypes.API_REQUEST,
  loading: ForecastActionTypes.FORECAST_LOADING,
  success: ForecastActionTypes.FORECAST_SUCCESS,
  error: ForecastActionTypes.FORECAST_ERROR,
  options: {
    method: 'post',
    url: ['', 'weather', encodeURIComponent(city)].join('/')
  }
});

export const clearState: ForecastClear = {
  type: ForecastActionTypes.FORECAST_CLEAR
};
