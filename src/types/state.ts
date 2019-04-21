import { Forecast } from './forecast';

export interface ForecastState {
  forecasts: Forecast[];
  loading: boolean;
  error: string | undefined;
}

import { History } from 'history';

import { RouterState } from 'connected-react-router';

export interface State {
  history?: History;
  router?: RouterState;
  forecast: ForecastState;
}
