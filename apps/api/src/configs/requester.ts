import axios from "axios";
import { MOMO_BASE_URL } from "./secrets";

axios.defaults.withCredentials = true;

const BASE_CONFIG = {
  validateStatus: () => true,
  withCredentials: true,
  timeout: 20000,
};

export const momoRequester = axios.create({
  baseURL: MOMO_BASE_URL,
  ...BASE_CONFIG,
});
