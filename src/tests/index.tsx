import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { combineReducers } from 'redux';
import { Middleware } from 'redux';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import { compose } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { connectRouter } from 'connected-react-router';
import { history } from '../routes/history';
import { State } from '../types/state';

const getReducers = () => combineReducers({ router: connectRouter(history) });

export const getInitialState = (stateOverride: Partial<State> = {}): State => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(stateOverride as any)
});

export const createStoreForTesting = (stateOverride?: Partial<State>) => {
  const initialState = getInitialState(stateOverride);
  const reducer = getReducers();

  const middlewares: Middleware[] = [];
  const enhancers = middlewares.map((a) => applyMiddleware(a));

  return createStore(reducer, initialState, compose(...enhancers));
};

export const wrapComponentInReduxForTesting = function<T>(
  Comp: React.ComponentType<T>,
  props: T,
  stateOverride: Partial<State> = {}
): ReactWrapper {
  return mount(
    <Provider store={createStoreForTesting(stateOverride)}>
      <MemoryRouter>
        <Comp {...props} />
      </MemoryRouter>
    </Provider>
  );
};
