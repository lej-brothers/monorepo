import { ICart } from "common";
import requester from "../configs/requester";
import { AxiosResponse } from "axios";

const CartService = {
  get: async (): Promise<AxiosResponse<ICart>> => {
    const res = await requester.get("/cart");
    return res;
  },

  update: async (cart: ICart): Promise<AxiosResponse<ICart>> => {
    const res = await requester.post("/cart", cart);
    return res;
  },
};

export default CartService;
