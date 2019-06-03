import axios from "axios";

const BASE_URL = "http://localhost:3004";

export function getAll() {
  return axios.get(`${BASE_URL}/todos`).then(({ data }) => data);
}

export function create(newItem) {
  return axios.post(`${BASE_URL}/todos`, newItem).then(({ data }) => data);
}

export function deleteItem(itemId) {
  return axios.delete(`${BASE_URL}/todos/${itemId}`).then(({ data }) => data);
}
