import { AxiosResponse } from 'axios';
import { IMomoCreateResponse, IMomoDeliveryInfo, IMomoUserInfo } from "common";
import requester from "../configs/requester";

interface CreateProps {
  userInfo: IMomoUserInfo;
  deliveryInfo: IMomoDeliveryInfo;
}

const MomoService = {
  create: async ({ userInfo, deliveryInfo }: CreateProps) => {
    const response = await requester.post("/momo/create", {
      userInfo,
      deliveryInfo,
    });

    return response as AxiosResponse<IMomoCreateResponse>;
  },
};

export default MomoService;
