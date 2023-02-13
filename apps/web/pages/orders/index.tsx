import Link from "next/link";
import useOrder from "../../hooks/useOrder";
import OrderCard from "../../components/OrderCard";
import { Button } from "@mui/material";

const OrderOverview = () => {
  const { order, isLoading } = useOrder();
  const products = order?.products || [];

  if (isLoading) {
    return (
      <div className="text-gray-900 w-full flex justify-center pt-12">
        Loading..
      </div>
    );
  }

  if (products.length) {
    return (
      <div className="flex flex-col gap-y-8 w-full">
        <OrderCard order={order} />
      </div>
    );
  }
};

export default OrderOverview;
