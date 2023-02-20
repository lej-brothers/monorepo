import { ICart } from "common";
import requester from "../configs/requester";
import { sleep } from "react-query/types/core/utils";

const CartModule = {
  get: async (): Promise<ICart> => {
    // await new Promise(res => setTimeout(res, 1000000));
    const res = await requester.get("/cart");
    return res.data;
  },

  update: async (cart: ICart) => {
    const updated = await requester.post("/cart", cart);
    return updated.data as ICart;
  },
};

export default CartModule;
