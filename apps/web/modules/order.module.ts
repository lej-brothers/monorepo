// import { IOrder } from "common";
// import requester from "../configs/requester";
// import { sleep } from "react-query/types/core/utils";

// const OrderModule = {
//   get: async (): Promise<IOrder> => {
//     // await new Promise(res => setTimeout(res, 1000000));
//     const res = await requester.get("/orders");
//     return res.data;
//   },

//   update: async (order: IOrder) => {
//     const updated = await requester.post("/orders", order);
//     return updated.data as IOrder;
//   },
// };

// export default OrderModule;
