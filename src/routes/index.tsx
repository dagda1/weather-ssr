import React from 'react';
import * as Urls from '../urls';
import { AsyncRouteProps, asyncComponent } from '@cutting/afterafterjs';

export interface Page<Props = unknown> extends AsyncRouteProps<Props> {
  heading: string;
  path: string;
  footerPage?: boolean;
}

// TODO: better loader
const Loading: React.FunctionComponent = () => <div>...LOADING...</div>;

export const routes: Page[] = [
  {
    heading: 'Home',
    path: Urls.Home,
    component: asyncComponent({
      loader: () => import('../containers/Home').then((module) => module.Home),
      Placeholder: Loading
    }),
    exact: true
  },
  {
    heading: 'Forecast',
    path: Urls.Forecast,
    component: asyncComponent({
      loader: () => import('../containers/ForecastView').then((module) => module.ConnectedForecast),
      Placeholder: Loading
    }),
    exact: true
  }
];
