import {
  SHORTEN_URL_REQUEST,
  SHORTEN_URL_SUCCESS,
  SHORTEN_URL_FAILURE,
  DECODE_URL_REQUEST,
  DECODE_URL_SUCCESS,
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

export function decodeUrlRequest(encodedPk) {
  return { type: DECODE_URL_REQUEST, encodedPk };
}

export function decodeUrlSuccess(url) {
  return { type: DECODE_URL_SUCCESS, url };
}
