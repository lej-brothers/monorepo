import { Collapse } from "antd";
import {
  IMomoCreateResponse,
  IMomoDeliveryInfo,
  IMomoForm,
  IMomoUserInfo,
} from "common";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import QRCode from "react-qr-code";
import { useMutation } from "react-query";
import MomoModule from "../../../../modules/momo.module";
import { ORDER_TABS } from "../../constants";
import Radio from "./components/Radio";
import { PAYMENT_METHODS } from "./constants";
import { PANEL_STYLE } from "./styles";
import Link from "next/link";

const { Panel } = Collapse;

interface Props {
  onChange: (tab: ORDER_TABS) => void;
}

const Payment = ({ onChange }: Props) => {
  const { mutate, data: momoData } = useMutation<
    IMomoCreateResponse,
    unknown,
    {
      userInfo: IMomoUserInfo;
      deliveryInfo: IMomoDeliveryInfo;
    }
  >("payment-create-momo", MomoModule.create);
  const methods = useFormContext<IMomoForm>();
  const [method, setMethod] = useState(PAYMENT_METHODS.BANKING);
  const { userInfo, deliveryInfo } = methods.watch();

  const onPrevious = () => onChange(ORDER_TABS.USER_INFO);
  const onNext = () => onChange(ORDER_TABS.DONE);

  const onChangeMethod = (key: string | string[]) => {
    if (key[1]) setMethod(key[1] as PAYMENT_METHODS);
  };

  useEffect(() => {
    switch (method) {
      case PAYMENT_METHODS.MOMO: {
        if (momoData) break;
        mutate({ userInfo, deliveryInfo });
      }
    }
  }, [method]);

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
            <div className="flex flex-col justify-center items-center w-full h-full p-4">
              <p className="mb-3">
                Bạn sẽ được điều hướng đến Momo để tiếp tục
              </p>
              <p className="mb-5 text-xl">Số tiền: 100.000 VND</p>

              {momoData?.payUrl && (
                <Link href={momoData?.payUrl} passHref>
                  <button>Thanh toán bằng Momo</button>
                </Link>
              )}
            </div>
          </Panel>
        </Collapse>

        {/* FOOTER */}
        <div className="absolute text-white flex bg-black bottom-0 rounded-t-2xl left-0 right-0 w-full h-[100px]">
          <div className="flex justify-end mx-[64px] my-[28px] text-white w-full">
            <button
              onClick={onPrevious}
              className="flex items-center mr-3 justify-center rounded-full p-5 bg-white text-black"
            >
              <AiFillCaretLeft className="mr-1" size={16} />
              Giỏ hàng
            </button>

            <button
              onClick={onNext}
              className=" flex items-center justify-center rounded-full p-5 bg-white text-black"
            >
              Thanh toán <AiFillCaretRight className="ml-1" size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
