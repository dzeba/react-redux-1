import axios from "axios";

const BASE_URL = "http://localhost:3004";

const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export function login(login, password) {
  return axios
    .post(`${BASE_URL}/login`, {
      login,
      password
    })
    .then(response => {
      const token = response.data.token;

      localStorage.setItem("token", token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    });
}

export function logout() {
  return axios.post(`${BASE_URL}/logout`).then(() => {
    localStorage.removeItem("token");

    window.location.href = "/";
  });
}
