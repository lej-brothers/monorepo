"use client";

import { Drawer } from "antd";
import Order from "../..";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../../../types/IStore";
import { toggleOrderDrawer } from "../../../../reducers/order/actions";

const OrderDrawer = () => {
  const dispatch = useDispatch();
  const open = useSelector((state: IStore) => state.order);

  const toggle = () => {
    console.log(open)
    dispatch(toggleOrderDrawer());
  };

  return (
    <Drawer
      width={535}
      open={open}
      bodyStyle={{ padding: 0 }}
      headerStyle={{ display: "none" }}
      onClose={toggle}
    >
      <Order />
    </Drawer>
  );
};

export default OrderDrawer;
