import { get } from 'lodash';
import {
  all, call, put, takeEvery,
} from 'redux-saga/effects';

import { SHORTEN_URL_REQUEST, DECODE_URL_REQUEST } from '../actions/actionTypes';
import { shortenUrlSuccess, shortenUrlFailure, decodeUrlSuccess } from '../actions/shortenerActions';
import { appAlertSuccess, appAlertError } from '../actions/appActions';
import { shortenerService, decoderService } from '../services/shortener';

export function* shortenUrlFlow({ url }) {
  try {
    const response = yield call(shortenerService, { url });
    const {
      success, longUrl, shortUrl, pk,
    } = response.data;
    if (success) {
      yield put(appAlertSuccess(`${longUrl} shortened! \\:D/`));
      yield put(shortenUrlSuccess(longUrl, shortUrl, pk));
    } else {
      yield put(shortenUrlFailure());
      yield put(appAlertError('Woah! Something aint right there. :/'));
    }
  } catch (error) {
    yield put(shortenUrlFailure());
    const message = get(error, 'response.data.message');
    yield put(appAlertError(message || 'Oh no! Something went wrong. :((('));
  }
}

export function* decodeUrlFlow({ encodedPk }) {
  try {
    const response = yield call(decoderService, { encodedPk });
    const { url } = response.data;
    yield put(decodeUrlSuccess(url));
    yield call(() => { window.location.href = url; });
  } catch (error) {
    const message = get(error, 'response.data.message');
    yield put(appAlertError(message || 'Oh no! Something went wrong. :((('));
  }
}

export function* watchShortenerFlow() {
  yield all([
    takeEvery(SHORTEN_URL_REQUEST, shortenUrlFlow),
    takeEvery(DECODE_URL_REQUEST, decodeUrlFlow),
  ]);
}

const shortenerSagas = [watchShortenerFlow()];

export default shortenerSagas;
