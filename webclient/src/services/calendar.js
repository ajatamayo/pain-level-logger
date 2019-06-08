import api from '../helpers/apiClient';


export function toggleDayService({ yyyy, mm, dd }, value) {
  return api.post(`/calendar/${yyyy}/${mm}/${dd}`, { value });
}

export function getDatesService() {
  return api.get('/calendar/get-dates');
}
