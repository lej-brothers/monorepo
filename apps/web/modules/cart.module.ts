import { ICart, ICartCreate } from "common";
import requester from "../configs/requester";

const CartModule = {
  get: async (): Promise<ICart> => {
    const res = await requester.get("/cart");
    return res.data;
  },

  update: async (cart: ICartCreate) => {
    const updated = await requester.post("/cart", cart);
    return updated.data as ICart;
  },
};

export default CartModule;
