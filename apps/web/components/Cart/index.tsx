import type { TabsProps } from "antd";
import { Button, Tabs } from "antd";
import { IMomoForm } from "common";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useCart from "../../hooks/useCart";
import { toggleCartDrawer } from "../../reducers/cart/actions";
import { IStore } from "../../types/IStore";
import Payment from "./components/Payment";
import Preview from "./components/Preview";
import UserInfo from "./components/UserInfo";
import { ORDER_TABS } from "./constants";

const Cart = () => {
  const methods = useForm<IMomoForm>();
  const dispatch = useDispatch();
  const open = useSelector((store: IStore) => store.cart);
  const [tab, setTab] = useState(ORDER_TABS.PREVIEW);
  const { cart } = useCart();

  const toggle = () => dispatch(toggleCartDrawer());

  const TABS: TabsProps["items"] = [
    {
      label: ORDER_TABS.PREVIEW,
      key: ORDER_TABS.PREVIEW,
      children: <Preview cart={cart} onChange={setTab} />,
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

export default Cart;

const Container = styled.div`
  .ant-tabs {
    height: 100%;
  }

  .ant-tabs-content-holder {
    display: flex;
  }
`;
