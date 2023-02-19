import type { TabsProps } from "antd";
import { Button, Tabs } from "antd";
import { IMomoForm } from "common";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useOrder from "../../hooks/useOrder";
import { toggleOrderDrawer } from "../../reducers/order/actions";
import { IStore } from "../../types/IStore";
import Payment from "./components/Payment";
import Preview from "./components/Preview";
import UserInfo from "./components/UserInfo";
import { ORDER_TABS } from "./constants";

const Order = () => {
  const methods = useForm<IMomoForm>();
  const dispatch = useDispatch();
  const open = useSelector((store: IStore) => store.order);
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
      label: ORDER_TABS.USER_INFO,
      key: ORDER_TABS.USER_INFO,
      children: <UserInfo onChange={setTab} />,
    },
    {
      label: ORDER_TABS.PAYMENT,
      key: ORDER_TABS.PAYMENT,
      children: <Payment onChange={setTab} />,
    },
  ];

  useEffect(() => {
    setTab(ORDER_TABS.PREVIEW);
  }, [open]);

  return (
    <FormProvider {...methods}>
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
    </FormProvider>
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
