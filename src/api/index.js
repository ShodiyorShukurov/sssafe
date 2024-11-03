import axios from "axios";
import { API_PATH, API_TOKEN } from "../utils/constants";

// Axios instansini yaratish
const Api = axios.create({
  baseURL: API_PATH,
});

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(API_TOKEN);
    if (token) {
      config.headers["Token"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Api;
