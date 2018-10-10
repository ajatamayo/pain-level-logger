import api from '../helpers/apiClient';

export function loginService(credentials) {
  return api.post('/auth/login', { grantType: 'password', ...credentials });
}

export function logincodeService(data) {
  return api.post('/auth/send-code', data);
}

export function deleteTokenService(data) {
  return api.delete('/auth/token', { data });
}
