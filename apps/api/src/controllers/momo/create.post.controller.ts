import { IMomoItem, IOrderProduct, IProduct } from "common";
import { Request, Response } from "express";
import { MOMO_PARTNER_CODE } from "../../configs/secrets";
import { IProductDocument } from "../../model/product.model";
import MomoService from "../../services/momo.service";
import OrderService from "../../services/order.service";
import ProductService from "../../services/product.service";

const controller = async (req: Request, res: Response) => {
  const { deliveryInfo, userInfo } = req.body;
  const orderId = (req.session as any).order;
  const order = await OrderService.getById(orderId);

  if (!order) return res.status(400).send();

  const orderProducts = order.products;

  const products: any[] = await Promise.all(
    orderProducts.map(async ({ _id, ...rest }) => {
      const product = (await ProductService.get(
        _id!
      )) as any as IProductDocument;
      return {
        ...product.toJSON(),
        ...rest,
      };
    })
  );

  /** MOMO PAYLOADS */
  const items: IMomoItem[] = products.map((product) => ({
    id: String(product._id),
    name: product.title,
    description: product.description,
    category: product.categories
      ?.map((category: any) => category.slug)
      .join(","),
    price: product.price,
    currency: "VND",
    quantity: product.quantity,
    totalPrice: product.price * product.quantity,
    imageUrl: product.images[0].url
  }));

  const amount = items.reduce((pre, cur) => {
    return pre + Number(cur.totalPrice);
  }, 0);

  const data = await MomoService.create({
    partnerCode: MOMO_PARTNER_CODE,
    partnerName: `LeJ'Cafe`,
    requestId: String(order._id),
    amount: amount,
    orderId: String(order._id),
    orderInfo: String(order._id),
    requestType: "captureWallet",
    extraData: "",
    items: items,
    deliveryInfo,
    userInfo,
    lang: "en",
  });

  res.send(data);
};

export default { controller };
