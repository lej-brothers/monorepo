"use client";

// orderID=646f0c4d218f3bda69033586&partnerCode=MOMOG2LT20230206&orderId=646f0c4d218f3bda69033586&requestId=646f0c4d218f3bda69033586&amount=800000&orderInfo=646f0c4d218f3bda69033586&orderType=momo_wallet&transId=1684999253990&resultCode=1006&message=Transaction+denied+by+user.&payType=&responseTime=1684999254003&extraData=&signature=14bd69ee5a4fb55601c2fdcab3b88fd15fc019a8b1ef52dda5d006184e48be85

import Image from "next/image";
import { LoadingOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Steps as AntSteps } from "antd";
import React, { useEffect, useMemo, useState } from "react";

import OrderBackgroundImage from "../../public/coffee-order-background.jpeg";
import LejCompactLogoWhite from "../../public/lej-compact-logo-white.png";

import { ORDER_STATUS } from "common";
import { isMobile, isTablet } from "react-device-detect";
import styled from "styled-components";

import useOrder from "../../hooks/useOrder";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  orderId: string;
}
const Order: React.FC<Props> = ({ orderId }) => {
  const router = useRouter();

  const [refetch, setRefetch] = useState(orderId ? 1000 : false);
  const { data } = useOrder(orderId, refetch as any);
  const { resultCode } = router.query;

  const error = resultCode !== '0';
  const paying = data?.status === ORDER_STATUS.Draft;
  const delivering = !paying && data?.status !== ORDER_STATUS.Delivery;

  const current = useMemo(() => {
    if (paying) return 1;

    switch (data?.status) {
      case ORDER_STATUS.Confirmed:
        return 2;
      case ORDER_STATUS.Delivery:
        return 3;
    }
  }, [data]);

  useEffect(() => {
    if (!paying && !delivering) setRefetch(false);
  }, [paying, delivering]);

  return (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(${OrderBackgroundImage.src})`,
        }}
        className={`h-[50vh] text-white flex flex-col justify-end rounded-b-[45px] px-[42px] py-[38px]`}
      >
        <Image
          className="mb-5"
          src={LejCompactLogoWhite.src}
          alt="lej-compact-logo-white"
          width={48}
          height={48}
        />
        <p className="text-3xl">Cảm ơn bạn</p>
        <p className="text-3xl">đã ủng hộ Le J’</p>
      </div>
      <Steps
        className={`pt-[45px] ${(isMobile && !isTablet) ? "px-6" : "pl-[110px] pr-[65px]"}`}
        direction="vertical"
        current={current}
        items={error ? [
          {
            status: "finish",
            title: "Tiếp nhận bởi Le J’",
            description: "Đơn hàng được tiếp nhận bởi Le J’",
          },
          {
            title: "Xác nhận thanh toán",
            description: "Thanh toán không thành công",
            status: 'error',
            icon:  
              <div className="rounded-full bg-red-500 w-[32px] flex justify-center items-center h-[32px]">
                <InfoCircleOutlined rev="123" style={{ color: "white" }} />
              </div>
            ,
          },
        ] : [
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
                <LoadingOutlined rev="123" style={{ color: "white" }} />
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
            icon: delivering && (
              <div className="rounded-full bg-black w-[32px] flex justify-center items-center h-[32px]">
                <LoadingOutlined rev="123" style={{ color: "white" }} />
              </div>
            ),
          },
        ]}
      />

      {(isMobile && !isTablet) && (
        <button
          onClick={() => router.push("/")}
          className="bg-black mt-8 rounded-full text-white py-4 text-xl mb-[200px] mx-8"
        >
          Quay lại trang chủ
        </button>
      )}
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
