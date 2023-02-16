import { Drawer } from "@mui/material";
import Order from "..";
import useOrder from "../../../hooks/useOrder";

const OrderDrawer = () => {
  const { openDrawer, toggle } = useOrder();

  return (
    <Drawer open={true} onClose={toggle}>
      <Order />
    </Drawer>
  );
};

export default OrderDrawer;
