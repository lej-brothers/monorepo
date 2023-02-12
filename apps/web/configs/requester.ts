import axios from "axios";
import { BASE_URL } from "./secrets";

axios.defaults.withCredentials = true;

const requester = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => true,
  withCredentials: true,
  timeout: 20000,
});

export default requester;
