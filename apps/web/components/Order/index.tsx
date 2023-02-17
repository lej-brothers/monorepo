import type { TabsProps } from "antd";
import { Button, Tabs } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import useOrder from "../../hooks/useOrder";
import Preview from "./components/Preview";
import styled from "styled-components";
import { ORDER_TABS } from "./constants";
import Payment from "./components/Payment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleOrderDrawer } from "../../reducers/order/actions";

const Order = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(ORDER_TABS.PREVIEW);
  const { order } = useOrder();

  const toggle = () => dispatch(toggleOrderDrawer());

  const TABS: TabsProps["items"] = [
    {
      label: ORDER_TABS.PREVIEW,
      key: ORDER_TABS.PREVIEW,
      children: <Preview order={order} onChange={setTab} />,
    },
    {
      label: ORDER_TABS.PAYMENT,
      key: ORDER_TABS.PAYMENT,
      children: <Payment />,
    },
  ];

  return (
    <Container className="flex flex-col h-full">
      <div className="flex justify-end mt-[46px] mr-[46px]">
        <Button onClick={toggle} type="text">
          <AiOutlineClose size={18} />
        </Button>
      </div>

      <Tabs
        animated
        activeKey={tab}
        destroyInactiveTabPane
        onChange={(key) => setTab(key as ORDER_TABS)}
        renderTabBar={() => <></>}
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
