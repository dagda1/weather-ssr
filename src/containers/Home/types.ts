import { ForecastResponse } from '../../types/forecast';
import { ApiAction } from '../../store/middleware';

export type ErrorMessage = string | null | undefined;

export type ApiActionCreator<T extends object, Payload = undefined> = T & {
  payload: Payload;
  error: ErrorMessage;
};

export type QueryForecast = (city: string) => ApiAction;

export enum ForecastActionTypes {
  FORECAST_LOADING = '@@forecast/LOADING',
  FORECAST_SUCCESS = '@@forecast/SUCCESS',
  FORECAST_ERROR = '@@forecast/ERROR',
  FORECAST_CLEAR = '@@forecast/CLEAR'
}

export interface ForecastLoading {
  type: ForecastActionTypes.FORECAST_LOADING;
}
export type ForecastSucess = ApiActionCreator<{ type: ForecastActionTypes.FORECAST_SUCCESS }, ForecastResponse>;
export type ForecastFail = ApiActionCreator<{ type: ForecastActionTypes.FORECAST_ERROR }>;
export interface ForecastClear {
  type: ForecastActionTypes.FORECAST_CLEAR;
}

export type ForecastActions = ForecastLoading | ForecastSucess | ForecastFail | ForecastClear;
