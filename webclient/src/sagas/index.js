import { all } from 'redux-saga/effects';

import authSagas from './authSagas';
import shortenerSagas from './shortenerSagas';
import calendarSagas from './calendarSagas';

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...shortenerSagas,
    ...calendarSagas,
  ]);
}
