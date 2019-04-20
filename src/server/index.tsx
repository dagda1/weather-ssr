import React from 'react';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { routes } from '../routes';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { HttpStatusCode, isProduction, getDisplayName } from '@cutting/util';
import { render, LayoutProps } from '@cutting/afterafterjs';
import favicon from 'serve-favicon';
import path from 'path';
import { Assets } from 'assets-webpack-plugin';
import configureStore from '../store';
import { history } from '../routes/history';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { ApplicationLayout } from '../layouts/ApplicationLayout';
import { currentConfig } from './config';

const assets: Assets = require(process.env.CUTTING_ASSETS_MANIFEST as string) as Assets;

const referrerPolicy = require('referrer-policy');

export const app = express();

app.use(helmet());
app.use(helmet.noCache());

app.use(referrerPolicy({ policy: 'no-referrer' }));
app.use(helmet.hidePoweredBy());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const publidDir = path.join(process.cwd(), isProduction ? 'dist/public' : 'public');

app.use(express.static(publidDir));

if (isProduction) {
  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'", 'data:']
      }
    })
  );
}

/* eslint-disable no-console */

const createConnectedLayout = (store: Store): React.FunctionComponent<LayoutProps> => {
  const Wrapped: React.FunctionComponent<LayoutProps> = ({ children }) => (
    <ApplicationLayout>
      <Provider store={store}>{children}</Provider>
    </ApplicationLayout>
  );

  Wrapped.displayName = getDisplayName(Wrapped);

  return Wrapped;
};

app.get('/weather/:city', (req: Request, res: Response) => {
  const city = req.param('city');

  const { baseUrl, apiKey } = currentConfig;

  const url = `${baseUrl}?q=${encodeURIComponent(city)},uk&APPID=${apiKey}`;

  res.status(HttpStatusCode.Ok).json({ ...currentConfig, url });
});

app.get('/*', async (req: Request, res: Response) => {
  const preloadedState = {};

  const store = configureStore(preloadedState, history);

  const html = await render({
    req,
    res,
    routes,
    assets,
    Layout: createConnectedLayout(store)
  });

  res.send(html);
});

const errorHandler = (err: Error, _: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  res.status(HttpStatusCode.InternalServerError).send('Internal Error');
};

app.use(errorHandler);

process.on('unhandledRejection', (err) => {
  console.error(err);
  throw err;
});
