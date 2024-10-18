import axios from "axios";
import { API_PATH, API_LOGIN, API_PASSWORD } from "../utils/constants";

const login = localStorage.getItem(API_LOGIN);
const password = localStorage.getItem(API_PASSWORD);

// API_LOGIN va API_PASSWORD ni Base64 formatiga kodlash
const passwordCode = btoa(`${password}`);
const username = btoa(`${login}`);

// Axios instansini yaratish
const Api = axios.create({
  baseURL: API_PATH,
  headers: {
    "Content-Type": "application/json",
    Username: username,
    password: passwordCode,
    "Access-Control-Allow-Origin": "*",
  },
});

export default Api;
