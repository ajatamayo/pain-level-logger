import { combineReducers } from 'redux';
import jwtDecode from 'jwt-decode';
import { ACCESS_TOKEN } from '../constants/localStorage';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGINCODE_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: null,
  message: null,
};

function createAuthReducer(actions) {
  return (state = initialState, action) => {
    switch (action.type) {
      case actions.request:
        return {
          ...state,
          isFetching: true,
          errorMessage: null,
          message: null,
        };
      case actions.success:
        return { ...state, isFetching: false, message: action.message };
      default:
        return state;
    }
  };
}

function createLoginCodeReducer(actions) {
  return (state = { uid: null }, action) => {
    switch (action.type) {
      case actions.success:
        return {
          ...state,
          uid: action.uid,
        };

      default:
        return state;
    }
  };
}

export default combineReducers({
  login: createAuthReducer({
    request: LOGIN_REQUEST,
    success: LOGIN_SUCCESS,
  }),
  isAuthenticated: () => !!localStorage.getItem(ACCESS_TOKEN),
  user: () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  },
  logincode: createLoginCodeReducer({
    success: LOGINCODE_SUCCESS,
  }),
});
