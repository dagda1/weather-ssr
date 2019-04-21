import { createStore, applyMiddleware, compose } from 'redux';
import { History } from 'history';
import { routerMiddleware } from 'connected-react-router';
import reducers from '../reducers';
import apiMiddleWare from './middleware';
import { State } from '../types/state';

const configureStore = (initialState: State, history: History) => {
  const middlewares = [apiMiddleWare];

  if (__BROWSER__) {
    middlewares.push(routerMiddleware(history));
  }

  const enhancers = middlewares.map((a) => applyMiddleware(a));

  const getComposeFunc = () => {
    if (__BROWSER__ && __DEV__) {
      const { composeWithDevTools } = require('redux-devtools-extension');
      return composeWithDevTools;
    }

    return compose;
  };

  const composeFunc = getComposeFunc();
  const composedEnhancers = composeFunc.apply(null, enhancers);

  const store = createStore(reducers, initialState, composedEnhancers);

  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default);
    });
  }

  return store;
};

export default (initialState: State, history: History) => {
  return configureStore(initialState, history);
};
