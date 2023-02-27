import { AuthService as BaseAuthService } from "queries";


const AuthService = {
  ...BaseAuthService,
  isAuthorized: () => {
    const auth = sessionStorage.getItem("auth");
    return auth === "true";
  },
};

export default AuthService;
