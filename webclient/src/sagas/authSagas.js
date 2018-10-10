import { get } from 'lodash';
import {
  all, call, put, takeEvery,
} from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  LOGINCODE_REQUEST,
} from '../actions/actionTypes';
import { loginSuccess, logincodeSuccess } from '../actions/authActions';
import { appAlertSuccess, appAlertError } from '../actions/appActions';
import { deleteTokenService, loginService, logincodeService } from '../services/auth';
import { getOrGenerateClientId, removeAuthTokens } from '../helpers/utils';
import { CLIENT_ID, ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/localStorage';

export function* loginFlow({ code, uid }) {
  try {
    const clientId = yield call(getOrGenerateClientId);
    const response = yield call(loginService, { clientId, code, uid });
    const { success } = response.data;
    if (success) {
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem(CLIENT_ID, clientId);
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      yield put(loginSuccess(accessToken));
      yield put(appAlertSuccess('Login successful.'));
      yield put(push('/'));
    } else {
      yield put(appAlertError(response.data.message));
    }
  } catch (error) {
    const { message } = error.response.data;
    yield put(appAlertError(message, error));
  }
}

export function* logoutFlow() {
  const clientId = localStorage.getItem(CLIENT_ID);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  try {
    yield call(deleteTokenService, {
      clientId,
      refreshToken,
    });
  } catch (e) {
    // console.log(e);
  }
  removeAuthTokens();
  yield put(push('/'));
}

export function* sendLoginCodeFlow({ email }) {
  try {
    const response = yield call(logincodeService, { email });
    const { success, uid } = response.data;
    if (success) {
      yield put(appAlertSuccess(`Login code sent to ${email}.`));
      yield put(logincodeSuccess(uid));
    } else {
      yield put(appAlertError('Welp. Something aint right there. :/'));
    }
  } catch (error) {
    const message = get(error, 'response.data.message');
    yield put(appAlertError(message || 'Woops, something went wrong. :((('));
  }
}

export function* watchAuthFlow() {
  yield all([
    takeEvery(LOGIN_REQUEST, loginFlow),
    takeEvery(LOGOUT_REQUEST, logoutFlow),
    takeEvery(LOGINCODE_REQUEST, sendLoginCodeFlow),
  ]);
}

const authSagas = [watchAuthFlow()];

export default authSagas;
