import api from '../helpers/apiClient';

export function shortenerService(data) {
  return api.post('/shortener', data);
}

export function decoderService({ encodedPk }) {
  return api.get(`/shortener/decode/${encodedPk}`);
}
