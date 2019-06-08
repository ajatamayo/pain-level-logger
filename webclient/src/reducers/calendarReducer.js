import {
  TOGGLE_DAY_REQUEST,
  TOGGLE_DAY_SUCCESS,
  GET_DATES_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  dates: {},
  isFetching: false,
  fetched: false,
  initialLoaded: false,
};

function calendarReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DAY_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case TOGGLE_DAY_SUCCESS: {
      const { date, value } = action;
      const dates = Object.assign({}, state.dates, { [date]: value });
      return {
        ...state,
        dates,
        isFetching: false,
      };
    }

    case GET_DATES_SUCCESS: {
      const { dates } = action;
      return {
        ...state,
        dates,
        initialLoaded: true,
      };
    }

    default:
      return state;
  }
}

export default calendarReducer;
