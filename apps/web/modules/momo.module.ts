import { IMomoCreateResponse, IMomoDeliveryInfo, IMomoUserInfo } from "common";
import requester from "../configs/requester";

const MomoModule = {
  create: async (userInfo: IMomoUserInfo, deliveryInfo: IMomoDeliveryInfo) => {
    const response = await requester.post("/momo/create", {
      userInfo,
      deliveryInfo,
    });

    return response.data as IMomoCreateResponse;
  },
};

export default MomoModule;
