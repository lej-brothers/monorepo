import React, { useEffect } from "react";
import useOrders from "../../utils/useOrders";

interface Props {}

const Order: React.FC<Props> = ({}) => {
  const { data } = useOrders();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <></>;
};

export default Order;
