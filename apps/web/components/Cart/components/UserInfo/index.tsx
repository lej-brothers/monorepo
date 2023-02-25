import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import Input from "../../../Input";
import { ORDER_TABS } from "../../constants";
import { useFormContext } from "react-hook-form";
import { IMomoForm } from "common";
import { useEffect } from "react";
import useCart from "../../../../hooks/useCart";

interface Props {
  onChange: (key: ORDER_TABS) => void;
}

const UserInfo = ({ onChange }: Props) => {
  const methods = useFormContext<IMomoForm>();
  const { cart } = useCart();

  const products = cart?.products || [];

  const formValid = methods.formState.isValid

  const onPrevious = () => onChange(ORDER_TABS.PREVIEW);
  const onNext = () => onChange(ORDER_TABS.PAYMENT);

  useEffect(() => {
    const total = products.reduce((pre, cur) => {
      return pre + cur.quantity;
    }, 0);

    methods.setValue("deliveryInfo.deliveryFee", "0");
    methods.setValue("deliveryInfo.quantity", `${total}`);
    
  }, [cart.products]);

  return (
    <>
      <div className="px-[74px]">
        <p className="text-4xl pb-[24px]">Thông tin của bạn</p>

        <label className="text-base">Tên nhận hàng</label>
        <Input name="userInfo.name" className="mt-[8px] mb-[16px]" />

        <label className="text-base">Email</label>
        <Input name="userInfo.email" className="mt-[8px] mb-[16px]" />

        <label className="text-base">Số điện thoại</label>
        <Input name="userInfo.phoneNumber" className="mt-[8px] mb-[16px]" />

        <label className="text-base">Địa chỉ nhận hàng</label>
        <Input
          name="deliveryInfo.deliveryAddress"
          className="mt-[8px] mb-[16px]"
        />

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
              disabled={!formValid}
              onClick={onNext}
              className={`${!formValid && 'bg-stone-500'} flex items-center justify-center rounded-full p-5 bg-white text-black`}
            >
              Thanh toán <AiFillCaretRight className="ml-1" size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
