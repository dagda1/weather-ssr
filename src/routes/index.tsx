import React from 'react';
import * as Urls from '../urls';
import { AsyncRouteProps, asyncComponent } from '@cutting/afterafterjs';

export interface Page<Props = unknown> extends AsyncRouteProps<Props> {
  heading: string;
  path: string;
  footerPage?: boolean;
}

// TODO: better loader
const Loading = () => <div>...LOADING...</div>;

/* eslint-disable react/display-name */
export const routes: Page[] = [
  {
    heading: 'Home',
    path: Urls.Home,
    component: asyncComponent({
      loader: () => import('../containers/Home').then((module) => module.HomeView),
      Placeholder: () => <Loading />
    }),
    exact: true
  },
  {
    heading: 'Forecast',
    path: Urls.Forecast,
    component: asyncComponent({
      loader: () => import('../components/ForecastView').then((module) => module.ForecastView),
      Placeholder: () => <Loading />
    }),
    exact: true
  }
];

export const bannerPages = routes.filter((p) => !p.footerPage && p.path !== Urls.Home);

export const footerPages = routes.filter((p) => p.footerPage);
