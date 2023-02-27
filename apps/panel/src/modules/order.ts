import requester from "../utils/requester";

const OrderModule = {
  list: async (page: number, limit: number) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    const category = await requester.get("/orders", { params });
    return category.data;
  },
};

export default OrderModule;
