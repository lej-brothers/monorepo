import { Drawer } from "antd";
import Cart from "../..";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../../../types/IStore";
import { toggleCartDrawer } from "../../../../reducers/cart/actions";
import { isMobile, isTablet } from "react-device-detect";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const open = useSelector((state: IStore) => state?.cart);

  const toggle = () => {
    dispatch(toggleCartDrawer());
  };

  return (
    <Drawer
      width={(isMobile && !isTablet) ? "100vw" : 535}
      open={!!open}
      bodyStyle={{ padding: 0 }}
      headerStyle={{ display: "none" }}
      onClose={toggle}
      destroyOnClose
    >
      <Cart />
    </Drawer>
  );
};

export default CartDrawer;
