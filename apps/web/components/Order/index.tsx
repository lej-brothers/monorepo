"use client";

import React from "react";
import { Steps as AntSteps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import OrderBackgroundImage from "../../public/coffee-order-background.jpeg";

import useOrder from "../../hooks/useOrder";
import { ORDER_STATUS } from "common";
import styled from "styled-components";

interface Props {
  orderId: string;
}
const Order: React.FC<Props> = ({ orderId }) => {
  const { data } = useOrder(orderId, orderId ? 1000 : false);

  const products = data?.cart?.products || [];
  const paying = data?.status === ORDER_STATUS.Draft;
  const current = paying ? 1 : 3;

  return (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(${OrderBackgroundImage.src})`,
        }}
        className={`h-[496px] text-white flex flex-col justify-end rounded-b-[45px] px-[42px] py-[38px]`}
      >
        <p className="text-3xl">Cảm ơn bạn</p>
        <p className="text-3xl">đã ủng hộ Le J’</p>
      </div>
      <Steps
        className="py-[45px] pl-[110px] pr-[65px]"
        direction="vertical"
        current={current}
        items={[
          {
            status: "finish",
            title: "Tiếp nhận bởi Le J’",
            description: "Đơn hàng được tiếp nhận bởi Le J’",
          },

          {
            title: "Xác nhận thanh toán",
            description: "Xác nhận từ dịch vụ thanh toán",
            icon: paying && (
              <div className="rounded-full bg-black w-[32px] flex justify-center items-center h-[32px]">
                <LoadingOutlined style={{ color: "white" }} />
              </div>
            ),
          },
          {
            status: !paying ? "finish" : "wait",
            title: "Email xác nhận từ Le J’",
            description:
              "Le J’ sẽ gửi email xác nhận đã nhận thanh toán vào email bạn cung cấp",
          },
          {
            status: !paying ? "finish" : "wait",
            title: "Le J’ gửi hàng cho bạn",
          },
        ]}
      />

      {/* <p className="text-4xl">Đơn hàng</p>
      <p className="text-sm text-gray-400">#{data?.code}</p>

      {products.map((product) => (
        <div key={product._id} className="my-6">
          <OrderProduct editable={false} product={product} />
        </div>
      ))}

      <Divider />

      <Steps
        direction="vertical"
        current={current}
        items={[
          {
            status: "finish",
            title: "Tiếp nhận bởi Le J’",
            description: "Đơn hàng được tiếp nhận bởi Le J’",
            icon: <CheckCircleFilled />,
          },
          {
            title: "Xác nhận thanh toán",
            icon: paying ? <LoadingOutlined /> : <CheckCircleFilled />,
            description: "Xác nhận từ dịch vụ thanh toán",
          },
          {
            status: !paying ? "finish" : "wait",
            title: "Le J’ gửi hàng cho bạn",
            icon: !paying && <LoadingOutlined />,
          },
        ]}
      /> */}
    </>
  );
};

export default Order;

const Steps = styled(AntSteps)`
  .ant-steps-item {
    .ant-steps-item-tail {
      background-color: black;
      &::after {
        background-color: black !important;
      }
    }
    .ant-steps-item-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      background: black;
      .ant-steps-icon {
        color: white;
      }
    }
  }
`;
