import { redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

const authLoader = () => {
  const authenticated = AuthService.isAuthorized();
  if (!authenticated) throw redirect("/auth");
  return {};
};

export default authLoader;
