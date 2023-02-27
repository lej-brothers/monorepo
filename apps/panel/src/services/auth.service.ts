import requester from "../utils/requester";

const AuthorizationService = {
  isAuthorized() {
    const state = sessionStorage.getItem("auth");
    return state === 'true';
  },

  async auth(token: string) {
    const response = await requester.post("/auth", {}, { headers: { token } });
    if (response.status === 200) {
      sessionStorage.setItem("auth", 'true');
      return true;
    }
    return false;
  },
};

export default AuthorizationService;
