import { get } from 'lodash';
import moment from 'moment';
import {
  all, call, put, takeEvery,
} from 'redux-saga/effects';

import { TOGGLE_DAY_REQUEST, GET_DATES_REQUEST } from '../actions/actionTypes';
import { toggleDaySuccess, getDatesSuccess } from '../actions/calendarActions';
import { appAlertSuccess, appAlertError } from '../actions/appActions';
import { toggleDayService, getDatesService } from '../services/calendar';

export function* toggleDayFlow({ value, ...dateObj }) {
  try {
    const { yyyy, mm, dd } = dateObj;
    const response = yield call(toggleDayService, { yyyy, mm, dd }, value);
    const { operation, date } = response.data;
    yield put(toggleDaySuccess(operation, date, value));
    yield put(appAlertSuccess(`${moment(`${yyyy}${mm}${dd}`, 'YYYYMMDD').format('LL')} set to ${value}.`));
  } catch (error) {
    const message = get(error, 'response.data.message');
    yield put(appAlertError(message || 'Oh no! Something went wrong. :((('));
  }
}

export function* getDatesFlow() {
  try {
    const response = yield call(getDatesService);
    const { dates } = response.data;
    yield put(getDatesSuccess(dates));
  } catch (error) {
    const message = get(error, 'response.data.message');
    yield put(appAlertError(message || 'Oh no! Something went wrong. :((('));
  }
}

export function* watchCalendarFlow() {
  yield all([
    takeEvery(TOGGLE_DAY_REQUEST, toggleDayFlow),
    takeEvery(GET_DATES_REQUEST, getDatesFlow),
  ]);
}

const calendarSagas = [watchCalendarFlow()];

export default calendarSagas;
