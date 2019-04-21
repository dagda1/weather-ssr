import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../routes/history';
import { forecastReducer } from '../containers/Home/reducer';

export default combineReducers({ forecast: forecastReducer, router: connectRouter(history) });
