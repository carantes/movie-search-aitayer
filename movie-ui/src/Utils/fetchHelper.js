import { API_URL, headers } from "./constants";

export const fetchHelper = (url, options = {}) =>
  fetch(`${API_URL}/${url}`, { headers, ...options }).then(res => res.json());
