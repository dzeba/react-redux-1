import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const extractData = response => response.data;

export function getAll(page = 1, limit = 2) {
  return axios
    .get(`${BASE_URL}/products?_page=${page}&_limit=${limit}`)
    .then(response => ({
      list: response.data,
      total: Number(response.headers["x-total-count"]),
      page,
      limit
    }));
}

export function getOne(id) {
  return axios.get(`${BASE_URL}/products/${id}`).then(extractData);
}

export function saveNew(product) {
  return axios.post(`${BASE_URL}/products`, product).then(extractData);
}
export function save(product) {
  return axios
    .put(`${BASE_URL}/products/${product.id}`, product)
    .then(extractData);
}
export function deleteProduct(itemId) {
  return axios
    .delete(`${BASE_URL}/products/${itemId}`)
    .then(({ data }) => data);
}
