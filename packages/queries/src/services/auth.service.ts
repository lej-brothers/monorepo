import requester from "../configs/requester";

const AuthorizationService = {
  async auth(token: string) {
    const response = await requester.post("/auth", {}, { headers: { token } });
    if (response.status === 200) {
      return true;
    }
    return false;
  },
};

export default AuthorizationService;
