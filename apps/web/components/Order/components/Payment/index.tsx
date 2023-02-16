import { Collapse } from "antd";
import { useState } from "react";
import Input from "../../../Input";
import Radio from "./components/Radio";
import { PAYMENT_METHODS } from "./constants";
import { PANEL_STYLE } from "./styles";

const { Panel } = Collapse;

const Payment = () => {
  const [method, setMethod] = useState(PAYMENT_METHODS.BANKING);

  const onChangeMethod = (key: string | string[]) =>
    setMethod(key[1] as PAYMENT_METHODS);

  return (
    <>
      <div className="px-[74px]">
        <p className="text-4xl pb-[24px]">Thông tin của bạn</p>

        <label className="text-base">Tên nhận hàng</label>
        <Input className="mt-[8px] mb-[16px]" />

        <label className="text-base">Email</label>
        <Input className="mt-[8px] mb-[16px]" />

        <label className="text-base">Số điện thoại</label>
        <Input className="mt-[8px] mb-[16px]" />

        <label className="text-base">Địa chỉ nhận hàng</label>
        <Input className="mt-[8px] mb-[16px]" />

        <label className="text-base">Chọn hình thức thanh toán</label>
        <Collapse
          bordered={false}
          activeKey={method}
          onChange={onChangeMethod}
          className="bg-white mt-[8px] mb-[120px]"
          expandIcon={({ isActive }) => <Radio checked={isActive} />}
        >
          <Panel
            header={
              <p className="text-sm font-light text-stone-500">
                Chuyển khoản ngân hàng
              </p>
            }
            key={PAYMENT_METHODS.BANKING}
            style={PANEL_STYLE[`${method === PAYMENT_METHODS.BANKING}`]}
          >
            <div className="flex flex-col">
              
            </div>
          </Panel>
          <Panel
            header={
              <p className="text-sm font-light text-stone-500">
                Thanh toán qua Momo
              </p>
            }
            key={PAYMENT_METHODS.MOMO}
            style={PANEL_STYLE[`${method === PAYMENT_METHODS.MOMO}`]}
          >
            <p>asdadasd</p>
          </Panel>
        </Collapse>
      </div>
    </>
  );
};

export default Payment;
