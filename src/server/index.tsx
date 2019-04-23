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
import { currentConfig } from './config';
import axios from 'axios';
import circularJson from 'circular-json';
import { State } from '../types/state';

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
        imgSrc: ["'self'", 'openweathermap.org', 'data:']
      }
    })
  );
}

/* eslint-disable no-console */

const createConnectedLayout = (store: Store): React.FunctionComponent<LayoutProps> => {
  const Wrapped: React.FunctionComponent<LayoutProps> = ({ children }) => <Provider store={store}>{children}</Provider>;

  Wrapped.displayName = getDisplayName(Wrapped);

  return Wrapped;
};

// TODO: would have a separate package/processs for the api
// using https://github.com/TypedProject/ts-express-decorators
app.post('/weather/:city', async (req: Request, res: Response) => {
  const city = req.params.city;

  const { baseUrl, apiKey } = currentConfig;

  const url = `${req.protocol}${baseUrl}?q=${encodeURIComponent(city)},uk&APPID=${apiKey}`;

  try {
    const results = await axios.get(url);

    res.status(HttpStatusCode.Ok).json(circularJson.stringify(results));
  } catch (ex) {
    console.log(ex.response.statusText);
    res.status(ex.response.status).json({ status: ex.response.status, responseText: ex.response.statusText });
  }
});

app.get('/*', async (req: Request, res: Response) => {
  const preloadedState: State = { forecast: { loading: false, error: undefined, forecast: undefined } };

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
