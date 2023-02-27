import { IOrderDeliveryInfo } from "./../../../common/src/types/IOrder";
import { useMutation, useQuery } from "react-query";
import OrderService from "../services/order.service";

const OrderQuery = {
  useOrder: (id: string) => {
    return useQuery(["order", id], async () => {
      try {
        const res = await OrderService.get(id);
        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    });
  },
  useCreateMomo: () => {
    return useMutation(
      "createMomoOrder",
      async (deliveryInfo: IOrderDeliveryInfo) => {
        try {
          const res = await OrderService.momo(deliveryInfo);
          return res.data;
        } catch (error) {
          return Promise.reject(error);
        }
      }
    );
  },
};

export default OrderQuery;
