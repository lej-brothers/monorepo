import moment from "moment";
import { Order } from "../model/order.model";

const InsightService = {
  /**
   *
   * Metadata
   *
   */

  orders: async (start: string, end: string) => {
    const total = await Order.count({
      createdAt: {
        $gte: new Date(start),
        $lte: new Date(end),
      },
    });

    return total;
  },

  revernue: async (start: string, end: string) => {
    const orders = await Order.find({
      createdAt: {
        $gte: new Date(start),
        $lte: new Date(end),
      },
    });
    const total = orders.reduce((pre, order) => pre + order.totalAmount, 0);
    return total;
  },

  sold: async (start: string, end: string) => {
    const orders = await Order.find({
      createdAt: {
        $gte: new Date(start),
        $lte: new Date(end),
      },
    });

    const total = orders.reduce((pre, order) => {
      const products = order.cart.products.reduce(
        (pre, product) => pre + product.quantity,
        0
      );
      return pre + products;
    }, 0);

    return total;
  },

  /**
   *
   */

  orderCountByDate: async (start: string, end: string) => {
    const orderByDate: { [date: string]: number } = {};

    const orders = await Order.find({
      createdAt: {
        $gte: new Date(start),
        $lte: new Date(end),
      },
    });

    orders.forEach((order) => {
      const date = moment(order.createdAt).format("DD-MM-YYYY");

      if (!orderByDate[date]) orderByDate[date] = 1;
      else orderByDate[date] = orderByDate[date] + 1;
    });

    return orders;
  },
};

export default InsightService;
