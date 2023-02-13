import { Button } from "@mui/material";
import { IOrder } from "common";
import Link from "next/link";
import { useMemo } from "react";
import format from "../../utils/format";
import OrderProduct from "./components/OrderProduct";

type OrderCardProps = {
  order: IOrder;
};

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return order.products.length;
  }, [order]);

  const numberOfProducts = useMemo(() => {
    return order.products.length;
  }, [order]);

  const totalPrice = useMemo(() => {
    return order.products.reduce((pre, cur) => {
      const price = pre + cur.price * cur.quantity;
      return price;
    }, 0);
  }, [order]);

  return (
    <div className="my-[80px] flex flex-col items-center justify-start min-h-screen">
      <div className="flex flex-col w-[600px]">
        <p className="text-2xl mb-11 font-medium">Giỏ hàng</p>
        {order.products.map((product) => (
         <div key={product._id} className="my-6 w-[400px]">
           <OrderProduct product={product} />
         </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
