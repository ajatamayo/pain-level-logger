import {
  SHORTEN_URL_REQUEST,
  SHORTEN_URL_SUCCESS,
  SHORTEN_URL_FAILURE,
} from './actionTypes';

export function shortenUrlRequest(url) {
  return { type: SHORTEN_URL_REQUEST, url };
}

export function shortenUrlSuccess(longUrl, shortUrl, pk) {
  return {
    type: SHORTEN_URL_SUCCESS, longUrl, shortUrl, pk,
  };
}

export function shortenUrlFailure() {
  return { type: SHORTEN_URL_FAILURE };
}
