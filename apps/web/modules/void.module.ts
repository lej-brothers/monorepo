import requester from "../configs/requester";

const VoldModule = {
  init: async () => {
    await requester.get("/void");
  },
};

export default VoldModule;
