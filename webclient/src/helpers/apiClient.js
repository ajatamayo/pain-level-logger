import axios from 'axios';
import { CLIENT_ID, ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/localStorage';

function getAuthorizationHeaders() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  const clientId = localStorage.getItem(CLIENT_ID);
  if (refreshToken && clientId) {
    return {
      Authorization: `Bearer ${accessToken}`,
      'X-Refresh-Token': refreshToken,
      'X-Client-Id': clientId,
    };
  }

  return {};
}

/*
  refresh auth header. currently done on each request.
  if you don't do this on each request, make sure
  that you keep the header up to date otherwise
 */
function createClient() {
  return axios.create({
    baseURL: '/api',
    headers: {
      ...getAuthorizationHeaders(),
    },
  });
}

function createApiClient() {
  function resolveAccessToken(res) {
    const accessToken = res.headers['x-access-token'];
    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN, accessToken);
    }
    return res;
  }

  return {
    get(...args) {
      return createClient().get(...args).then(resolveAccessToken);
    },
    post(...args) {
      return createClient().post(...args).then(resolveAccessToken);
    },
    put(...args) {
      return createClient().put(...args).then(resolveAccessToken);
    },
    delete(...args) {
      return createClient().delete(...args).then(resolveAccessToken);
    },
  };
}

export default createApiClient();
