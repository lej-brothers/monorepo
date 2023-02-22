import { useQuery } from "react-query";
import { IOrder } from "common";
import OrderModule from "../modules/order.module";

const useOrder = (id: string, refetchInterval?: number | false) =>
  useQuery<IOrder>("order" + id, () => OrderModule.get(id), {
    staleTime: 10000,
    refetchInterval
  });

export default useOrder;
