import { ICart } from "common";
import { Cart, ICartDocument } from "./../model/cart.model";

const CartService = {
  async create(sessionId: string) {
    const cart = await Cart.create({
      sessionId,
      products: [],
      promotions: [],
    });
    return cart;
  },
  async getById(cartId: string) {
    const order = await Cart.findById(cartId);
    return order as any as ICartDocument;
  },
  async get(sessionId: string) {
    const cart = await Cart.findOne({ sessionId });
    if (!cart) return this.create(sessionId);
    return cart;
  },
  async update(cart: ICart) {
    const updated = await Cart.findOneAndUpdate({ _id: cart._id }, cart);
    return updated;
  },
};

export default CartService;
