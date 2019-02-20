import {
  TOGGLE_DAY_REQUEST,
  TOGGLE_DAY_SUCCESS,
} from './actionTypes';

export function toggleDayRequest({ yyyy, mm, dd }) {
  return {
    type: TOGGLE_DAY_REQUEST, yyyy, mm, dd,
  };
}

export function toggleDaySuccess(operation, date) {
  return { type: TOGGLE_DAY_SUCCESS, operation, date };
}
