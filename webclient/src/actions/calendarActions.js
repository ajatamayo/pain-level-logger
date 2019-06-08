import {
  TOGGLE_DAY_REQUEST,
  TOGGLE_DAY_SUCCESS,
  GET_DATES_REQUEST,
  GET_DATES_SUCCESS,
  GET_DATES_FAILURE,
} from './actionTypes';

export function toggleDayRequest({ yyyy, mm, dd }, value) {
  return {
    type: TOGGLE_DAY_REQUEST, yyyy, mm, dd, value,
  };
}

export function toggleDaySuccess(operation, date, value) {
  return {
    type: TOGGLE_DAY_SUCCESS, operation, date, value,
  };
}

export function getDatesRequest() {
  return {
    type: GET_DATES_REQUEST,
  };
}

export function getDatesSuccess(dates) {
  return {
    type: GET_DATES_SUCCESS, dates,
  };
}

export function getDatesFailure() {
  return {
    type: GET_DATES_FAILURE,
  };
}
