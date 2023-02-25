import { Drawer } from "antd";
import Cart from "../..";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../../../types/IStore";
import { toggleCartDrawer } from "../../../../reducers/cart/actions";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const open = useSelector((state: IStore) => state?.cart);

  const toggle = () => {
    dispatch(toggleCartDrawer());
  };

  return (
    <Drawer
      width={535}
      open={!!open}
      bodyStyle={{ padding: 0 }}
      headerStyle={{ display: "none" }}
      onClose={toggle}
    >
      <Cart />
    </Drawer>
  );
};

export default CartDrawer;
