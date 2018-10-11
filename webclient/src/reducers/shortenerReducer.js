import {
  SHORTEN_URL_REQUEST,
  SHORTEN_URL_SUCCESS,
  SHORTEN_URL_FAILURE,
  DECODE_URL_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  urlPairs: [],
  isFetching: false,
  redirectUrl: '',
};

function shortenerReducer(state = initialState, action) {
  switch (action.type) {
    case SHORTEN_URL_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case SHORTEN_URL_SUCCESS: {
      const { urlPairs } = state;
      const { longUrl, shortUrl, pk } = action;
      if (!urlPairs.some(item => item.pk === pk)) {
        urlPairs.unshift({ longUrl, shortUrl, pk });
      }
      return {
        ...state,
        isFetching: false,
        urlPairs,
      };
    }
    case SHORTEN_URL_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case DECODE_URL_SUCCESS:
      return {
        ...state,
        redirectUrl: action.url,
      };

    default:
      return state;
  }
}

export default shortenerReducer;
