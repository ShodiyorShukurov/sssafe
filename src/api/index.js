import axios from "axios";
import { API_PATH } from "../utils/constants";

const Api = axios.create({
  baseURL: API_PATH,
  headers: {
    contentType: 'application/json',
    "Access-Control-Allow-Origin": '*'
  },
});

export default Api;
