import axios from "axios";
import { API_PATH, API_TOKEN } from "../utils/constants";


// Axios instansini yaratish
const Api = axios.create({
  baseURL: API_PATH,
  headers: {
    "Content-Type": "application/json",
    "Token": localStorage.getItem(API_TOKEN)
  },
});

export default Api;
