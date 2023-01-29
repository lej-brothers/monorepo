import { atom } from "recoil";

const authorization = atom({
  key: "authorization",
  default: { loggedIn: false },
});

export default authorization;
