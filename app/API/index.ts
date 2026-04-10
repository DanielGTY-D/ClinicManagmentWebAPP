import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5221/api",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use( (config) => {
  const token = localStorage.getItem("TOKEN");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
})


export {
    api
}
