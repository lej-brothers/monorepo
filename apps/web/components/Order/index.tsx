import type { TabsProps } from "antd";
import { Button, Tabs } from "antd";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import useOrder from "../../hooks/useOrder";
import format from "../../utils/format";
import OrderProduct from "../OrderCard/components/OrderProduct";
import Preview from "./components/Preview";
import styled from "styled-components";
import { ORDER_TABS } from "./constants";
import Payment from "./components/Payment";

const Order = () => {
  const { order, isLoading } = useOrder();

  const TABS: TabsProps["items"] = [
    {
      label: ORDER_TABS.PREVIEW,
      key: ORDER_TABS.PREVIEW,
      children: <Preview order={order} />,
    },
    {
      label: ORDER_TABS.PAYMENT,
      key: ORDER_TABS.PAYMENT,
      children: <Payment />
    }
  ];

  return (
    <Container className="flex flex-col h-full">
      <div className="flex justify-end mt-[46px] mr-[46px]">
        <Button type="text">
          <AiOutlineClose size={18} />
        </Button>
      </div>

      <Tabs
        animated
        renderTabBar={() => <></>}
        defaultActiveKey={ORDER_TABS.PREVIEW}
        items={TABS}
      />
    </Container>
  );
};

export default Order;

const Container = styled.div`
  .ant-tabs {
    height: 100%;
  }

  .ant-tabs-content-holder {
    display: flex;
  }
`;
