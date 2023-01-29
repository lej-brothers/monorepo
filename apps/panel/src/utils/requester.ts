import axios from "axios";
import { BASE_URL } from "../global/secrets";

const requester = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => true,
});

export default requester;
