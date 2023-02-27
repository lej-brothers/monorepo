import { useQuery } from "react-query";
import { IOrder, IPaginated } from "common";
import OrderModule from "../services/order";

const useOrders = () =>
  useQuery<IPaginated<IOrder>>("orders", () =>
    OrderModule.list(1, 100)
  );

export default useOrders;
