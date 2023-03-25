import { LoadingOutlined } from "@ant-design/icons";
import { Collapse, Spin } from "antd";
import {
  IMomoCreateResponse,
  IMomoForm,
  IOrderDeliveryInfo,
  PAYMENT_METHOD,
} from "common";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { useMutation } from "react-query";
import OrderModule from "../../../../modules/order.module";
import { ORDER_TABS } from "../../constants";
import Radio from "./components/Radio";
import { PANEL_STYLE } from "./styles";
import useCart from "../../../../hooks/useCart";

const { Panel } = Collapse;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface Props {
  onChange: (tab: ORDER_TABS) => void;
  onFinish: () => void;
}

const Payment = ({ onChange, onFinish }: Props) => {
  const {
    mutate,
    data: momoData,
    isLoading: isMomoLoading,
  } = useMutation<IMomoCreateResponse, unknown, IOrderDeliveryInfo>(
    "payment-create-momo",
    OrderModule.momo
  );

  const { formattedTotalAmount } = useCart();
  const methods = useFormContext<IMomoForm>();
  const [method, setMethod] = useState(PAYMENT_METHOD.MOMO);
  const { userInfo, deliveryInfo } = methods.watch();

  const shouldShowMomoError =
    !isMomoLoading && method === PAYMENT_METHOD.MOMO && !momoData;

  const onPrevious = () => onChange(ORDER_TABS.USER_INFO);

  const onChangeMethod = (key: string | string[]) => {
    if (key[1]) setMethod(key[1] as PAYMENT_METHOD);
  };

  useEffect(() => {
    switch (method) {
      case PAYMENT_METHOD.MOMO: {
        if (momoData) break;
        mutate({
          name: userInfo.name,
          email: userInfo.email,
          phone: userInfo.phoneNumber,
          address: deliveryInfo.deliveryAddress,
        });
      }
    }
  }, [method]);

  return (
    <>
      <div className="px-[34px] lg:px-[74px]">
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
            key={PAYMENT_METHOD.BANKING}
            style={PANEL_STYLE[`${method === PAYMENT_METHOD.BANKING}`]}
            collapsible="disabled"
          >
            <div className="flex flex-col"></div>
          </Panel>
          <Panel
            header={
              <p className="text-sm font-light text-stone-500">
                Thanh toán qua Momo
              </p>
            }
            key={PAYMENT_METHOD.MOMO}
            style={PANEL_STYLE[`${method === PAYMENT_METHOD.MOMO}`]}
          >
            {isMomoLoading && (
              <div className="flex flex-col justify-center items-center w-full h-[140px] p-4">
                <Spin indicator={antIcon} />{" "}
              </div>
            )}
            {!isMomoLoading && shouldShowMomoError && (
              <div className="flex flex-col justify-center items-center w-full h-[140px] p-4">
                <p className="text-xl text-center text-red-600">
                  Có lỗi xảy ra với MOMO server, vui lòng thử lại sau
                </p>
              </div>
            )}
            {!isMomoLoading && !shouldShowMomoError && (
              <div className="flex flex-col justify-center items-center w-full h-[140px] p-4">
                <p className="mb-3">
                  Bạn sẽ được điều hướng đến Momo để tiếp tục
                </p>
                <p className="mb-5 text-xl">
                  Số tiền: {formattedTotalAmount} VND
                </p>

                {momoData?.payUrl && (
                  <Link href={momoData?.payUrl} passHref>
                    <button
                      onClick={onFinish}
                      className="w-full rounded-full hover:bg-pink-500 bg-pink-600 transition-colors text-white px-3 py-2"
                    >
                      Thanh toán với MOMO
                    </button>
                  </Link>
                )}
              </div>
            )}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
