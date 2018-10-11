import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGINCODE_REQUEST,
  LOGINCODE_SUCCESS,
  LOGOUT_REQUEST,
} from './actionTypes';

export function loginRequest(code, uid) {
  return { type: LOGIN_REQUEST, code, uid };
}

export function loginSuccess(token) {
  return { type: LOGIN_SUCCESS, accessToken: token };
}

export function logincodeRequest(email) {
  return { type: LOGINCODE_REQUEST, email };
}

export function logincodeSuccess(uid) {
  return { type: LOGINCODE_SUCCESS, uid };
}

export function logoutRequest() {
  return { type: LOGOUT_REQUEST };
}
