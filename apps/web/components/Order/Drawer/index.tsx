import React from "react";
import { Button, Drawer } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";

import Order from "../index";

interface Props {}

const OrderDrawer: React.FC<Props> = ({}) => {
  const router = useRouter();
  const { orderID } = router.query;

  const open = !!orderID;

  const toggle = () => {
    router.push(router.basePath);
  };

  return (
    <Drawer
      width={535}
      open={open}
      bodyStyle={{ padding: 0 }}
      headerStyle={{ display: "none" }}
      onClose={toggle}
    >
      <div className="flex flex-col h-full">
        <Order orderId={orderID as string} />
      </div>
    </Drawer>
  );
};

export default OrderDrawer;
