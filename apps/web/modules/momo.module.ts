import { IMomoCreateResponse, IMomoDeliveryInfo, IMomoUserInfo } from "common";
import requester from "../configs/requester";

interface CreateProps {
  userInfo: IMomoUserInfo;
  deliveryInfo: IMomoDeliveryInfo;
}

const MomoModule = {
  create: async ({ userInfo, deliveryInfo }: CreateProps) => {
    const response = await requester.post("/momo/create", {
      userInfo,
      deliveryInfo,
    });

    return response.data as IMomoCreateResponse;
  },
};

export default MomoModule;
