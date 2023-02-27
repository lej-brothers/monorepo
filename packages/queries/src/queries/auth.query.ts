import { useMutation, useQuery } from "react-query";
import AuthorizationService from "../services/auth.service";

const AuthQuery = {
  useAuth: () => {
    return useMutation("auth", async (token: string) => {
      try {
        const success = await AuthorizationService.auth(token);
        return success;
      } catch (error) {
        return Promise.reject(error);
      }
    });
  },
};

export default AuthQuery;
