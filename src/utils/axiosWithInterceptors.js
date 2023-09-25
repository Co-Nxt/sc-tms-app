import axios from 'axios'

const api = axios.create({
  baseURL: "http://localhost:50002", // Replace with your API's base URL
  timeout: 10000, // Set a timeout for requests (optional)
});

api.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("x-access-token"); // Retrieve the access token from local storage
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
export default api