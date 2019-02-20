import {
  TOGGLE_DAY_REQUEST,
  TOGGLE_DAY_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  dates: [],
  isFetching: false,
  fetched: false,
};

function shortenerReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DAY_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case TOGGLE_DAY_SUCCESS: {
      const { operation, date } = action;
      let dates;
      if (operation === 'added') {
        // create clone of array
        dates = [...state.dates, date];
      } else {
        dates = state.dates.filter(o => o === date);
      }
      return {
        ...state,
        dates,
      };
    }

    default:
      return state;
  }
}

export default shortenerReducer;
