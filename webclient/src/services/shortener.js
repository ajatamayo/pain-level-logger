import api from '../helpers/apiClient';

// eslint-disable-next-line import/prefer-default-export
export function shortenerService(data) {
  return api.post('/shortener', data);
}
