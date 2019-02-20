import { get } from 'lodash';
import {
  all, call, put, takeEvery,
} from 'redux-saga/effects';

import { TOGGLE_DAY_REQUEST } from '../actions/actionTypes';
import { toggleDaySuccess } from '../actions/calendarActions';
import { appAlertSuccess, appAlertError } from '../actions/appActions';
import { toggleDayService } from '../services/calendar';

export function* toggleDayFlow({ yyyy, mm, dd }) {
  try {
    const response = yield call(toggleDayService, { yyyy, mm, dd });
    const { operation, date } = response.data;
    yield put(toggleDaySuccess(operation, date));
    yield put(appAlertSuccess(`${yyyy}-${mm}-${dd} ${operation}.`));
  } catch (error) {
    const message = get(error, 'response.data.message');
    yield put(appAlertError(message || 'Oh no! Something went wrong. :((('));
  }
}

export function* watchCalendarFlow() {
  yield all([
    takeEvery(TOGGLE_DAY_REQUEST, toggleDayFlow),
  ]);
}

const calendarSagas = [watchCalendarFlow()];

export default calendarSagas;
