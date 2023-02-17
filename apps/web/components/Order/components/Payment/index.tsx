import { Collapse } from "antd";
import { useEffect, useState } from "react";
import Input from "../../../Input";
import Radio from "./components/Radio";
import { PAYMENT_METHODS } from "./constants";
import { PANEL_STYLE } from "./styles";

const { Panel } = Collapse;

const Payment = () => {
  const [method, setMethod] = useState(PAYMENT_METHODS.BANKING);

  const onChangeMethod = (key: string | string[]) => {
    if (key[1]) setMethod(key[1] as PAYMENT_METHODS);
  };

  return (
    <>
      <div className="px-[74px]">
        <p className="text-4xl pb-[24px]">Thanh toán</p>

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
            <div className="flex flex-col"></div>
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
