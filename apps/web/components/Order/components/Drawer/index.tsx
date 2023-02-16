import { Drawer } from 'antd';
import useOrder from "../../../../hooks/useOrder";
import Order from "../.."; 

const OrderDrawer = () => {
  const { openDrawer, toggle } = useOrder();

  return (
    <Drawer
      open={true}
      width={535}
      bodyStyle={{ padding: 0 }}
      headerStyle={{ display: 'none' }}
      onClose={toggle}
    >
      <Order />
    </Drawer>
  );
};

export default OrderDrawer;
