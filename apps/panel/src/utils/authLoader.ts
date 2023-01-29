import { redirect } from "react-router-dom";
import AuthorizationModule from "../modules/authorization";

const authLoader = () => {
  const authenticated = AuthorizationModule.isAuthorized();
  if (!authenticated) throw redirect("/auth");
  return {};
};

export default authLoader;
