import { AxiosResponse } from 'axios';
import { IMomoCreateResponse, MomoCreateProps } from "common";
import requester from "../configs/requester";

const MomoService = {
  create: async ({ userInfo, deliveryInfo }: MomoCreateProps) => {
    const response = await requester.post("/momo/create", {
      userInfo,
      deliveryInfo,
    });

    return response as AxiosResponse<IMomoCreateResponse>;
  },
};

export default MomoService;
