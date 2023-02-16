import type { TabsProps } from "antd";
import { Button, Tabs } from "antd";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import useOrder from "../../hooks/useOrder";
import format from "../../utils/format";
import OrderProduct from "../OrderCard/components/OrderProduct";
import Preview from "./components/Preview";
import styled from "styled-components";

const Order = () => {
  const { order, isLoading } = useOrder();

  const TABS: TabsProps["items"] = [
    {
      label: "",
      key: "preview",
      children: <Preview order={order} />,
    },
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
        className="h-full"
        renderTabBar={() => <></>}
        popupClassName="h-full"
        defaultActiveKey="preview"
        items={TABS}
      ></Tabs>
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
