import { useMutation, useQuery } from "react-query";
import CartService from "../services/cart.service";
import { ICart } from "common";

const CartQuery = {
  useCart: () =>
    useQuery("cart", async () => {
      try {
        const cart = await CartService.get();
        return cart.data;
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  useCartUpdate: () =>
    useMutation("updateCart", async (toUpdate: ICart) => {
      try {
        const res = await CartService.update(toUpdate);
        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    }),
};

export default CartQuery;
