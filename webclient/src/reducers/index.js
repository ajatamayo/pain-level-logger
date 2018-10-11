import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './authReducer';
import app from './appReducer';
import shortener from './shortenerReducer';
import { LOGOUT_REQUEST } from '../actions/actionTypes';

const appReducer = combineReducers({
  router: routerReducer,
  auth,
  app,
  shortener,
});

export default (state, action) => {
  if (action.type === LOGOUT_REQUEST) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
