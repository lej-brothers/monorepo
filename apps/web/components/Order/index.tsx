import React from "react";
import { Divider, Steps } from "antd";
import { LoadingOutlined, CheckCircleFilled } from "@ant-design/icons";

import OrderProduct from "../Cart/components/Product";
import useOrder from "../../hooks/useOrder";
import { ORDER_STATUS } from "common";

interface Props {
  orderId: string;
}
const Order: React.FC<Props> = ({ orderId }) => {
  const { data } = useOrder(orderId, orderId ? 1000 : false);

  const products = data?.cart?.products || [];
  const paying = data?.status === ORDER_STATUS.Draft;
  const current = paying ? 2 : 3;

  return (
    <>
      <p className="text-4xl">Đơn hàng</p>
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
      />
    </>
  );
};

export default Order;
