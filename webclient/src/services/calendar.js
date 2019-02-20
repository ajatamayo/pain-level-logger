import api from '../helpers/apiClient';

// eslint-disable-next-line import/prefer-default-export
export function toggleDayService({ yyyy, mm, dd }) {
  return api.post(`/calendar/${yyyy}/${mm}/${dd}`);
}
