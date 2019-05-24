import { API_URL, headers } from "./constants";

const validateResponse = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const returnJSON = response => {
  return response.json();
};

export const fetchHelper = (url, options = {}) =>
  fetch(`${API_URL}/${url}`, { headers, ...options })
    .then(validateResponse)
    .then(returnJSON);
