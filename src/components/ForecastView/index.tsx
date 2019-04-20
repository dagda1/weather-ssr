import React from 'react';
import { Forecast } from '../../types/forecast';

export interface ForecastView {
  forecasts: Forecast[];
}

export const ForecastView: React.FunctionComponent = () => {
  return <h1>Fuck this</h1>;
};
