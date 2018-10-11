import { all } from 'redux-saga/effects';

import authSagas from './authSagas';
import shortenerSagas from './shortenerSagas';

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...shortenerSagas,
  ]);
}
