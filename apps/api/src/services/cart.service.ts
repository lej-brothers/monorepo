import { ICart, ICartCreate } from "common";
import { Cart, ICartDocument } from "./../model/cart.model";
import PromotionService from "./promotion.service";
import { between } from "../utils/between";
import { IPromotionDocument } from "../model/promotion.model";
import { Promotion } from "../model/promotion.model";

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
    const cart = await Cart.findOne({ sessionId }).populate({
      path: "promotions",
      model: Promotion,
    });
    if (!cart) return this.create(sessionId);
    return cart;
  },
  async update(cart: ICartCreate) {
    const promises = cart.promotions.map(async (code) => {
      const promotion = await PromotionService.getByCode(code);
      if (!promotion) return null;

      const timeValid = between(promotion.activeFrom, promotion.activeTo);
      const countValid = promotion.purchasesLimit
        ? promotion.purchasesCount || 0 < promotion.purchasesLimit
        : true;

      if (!timeValid || !countValid) return null;

      return promotion;
    });

    const promotions = (await Promise.all(promises)).filter(
      (item) => item !== null
    ) as IPromotionDocument[];

    cart.products = cart.products.map((product) => {
      const toApply = promotions.find((promotion) => {
        const products = promotion.products || [];
        const categories = promotion.categories || [];

        return (
          products.find((item) => String(item._id) === product._id) !==
            undefined ||
          !!categories.filter((item) => product.categories.includes(String(item)))
            .length
        );
      });

      let afterPrice = product.price.price;

      if (toApply) {
        afterPrice =
          toApply.promoPrice <= 1
            ? product.price.price - product.price.price * toApply.promoPrice
            : product.price.price - toApply.promoPrice;
      }

      return { ...product, afterPrice };
    });

    const payload: ICart = {
      ...cart,
      promotions: promotions.map((promotion) => promotion._id),
    };

    const updated = await Cart.findOneAndUpdate({ _id: cart._id }, payload);
    return updated;
  },
  async clean(sessionId: string) {
    await Cart.findOneAndUpdate(
      { sessionId },
      { products: [], promotions: [] }
    );
  },
};

export default CartService;
