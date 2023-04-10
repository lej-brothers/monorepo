import * as yup from "yup";
import type { TabsProps } from "antd";
import { Button, Tabs } from "antd";
import { IMomoForm } from "common";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { ORDER_TABS, PHONE_REG } from "./constants";
import { isMobile, isTablet } from "react-device-detect";

const Cart = () => {
  const methods = useForm<IMomoForm>({
    resolver: yupResolver(
      yup.object().shape({
        deliveryInfo: yup.object().shape({
          deliveryAddress: yup.string().required(),
          deliveryFee: yup.string().required(),
          quantity: yup.string().required(),
        }),
        userInfo: yup.object().shape({
          name: yup.string().required(),
          phoneNumber: yup.string().matches(PHONE_REG).required(),
          email: yup.string().email().required(),
        }),
      })
    ),
  });

  const dispatch = useDispatch();
  const open = useSelector((store: IStore) => store?.cart);
  const [tab, setTab] = useState(ORDER_TABS.PREVIEW);
  const { cart } = useCart();

  const toggle = () => dispatch(toggleCartDrawer());

  const onFinish = () => {
    toggle();
  };

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
      children: <Payment onFinish={onFinish} onChange={setTab} />,
    },
  ];

  useEffect(() => {
    setTab(ORDER_TABS.PREVIEW);
  }, [open]);

  return (
    <FormProvider {...methods}>
      <Container className="flex flex-col h-full">
        <div
          className={`flex justify-end mt-[46px] ${
            isMobile && !isTablet ? "mr-[16px]" : "mr-[46px]"
          }`}
        >
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
