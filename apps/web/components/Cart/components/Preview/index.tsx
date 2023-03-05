import { ICart } from "common";
import { AiOutlineClose } from "react-icons/ai";
import OrderProduct from "../Product";
import format from "../../../../utils/format";
import { ORDER_TABS } from "../../constants";
import { Button, Input, Tag } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import useCart from "../../../../hooks/useCart";
import dynamic from "next/dynamic";
import Counter from "../../../Counter";

const ScrollBar = dynamic(() => import("react-scrollbar"), { ssr: false });

interface Props {
  cart: ICart;
  onChange: (key: ORDER_TABS) => void;
}

const Preview = ({ cart, onChange }: Props) => {
  const { addPromotion, removePromotion } = useCart();
  const [discountInput, setDiscountInput] = useState("");

  const products = cart?.products || [];

  const totalPrice = products.reduce((pre, cur) => {
    return pre + cur.afterPrice * cur.quantity;
  }, 0);

  const totalPriceFormatter = (totalPrice: number) => format("vi-VN", "VND", totalPrice);

  const onNext = () => onChange(ORDER_TABS.USER_INFO);

  const onDiscountInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDiscountInput(event.target.value);
  };

  const onAddPromotion = () => {
    addPromotion(discountInput);
    setDiscountInput("");
  };

  const onRemovePromotion = (code: string) => {
    removePromotion(code);
  };

  useEffect(() => {
    return () => {
      setDiscountInput("");
    };
  }, []);

  return (
    <div className="relative max-h-[100vh]">
      <ScrollBar smoothScrolling className="px-[74px] h-[calc(100vh_-_130px)]">
        <div className="flex pb-[100px] flex-col">
          <p className="text-4xl mb-3">Giỏ hàng</p>

          <div className="flex">
            <Input
              value={discountInput}
              onChange={onDiscountInputChange}
              placeholder="Nhập mã giảm giá ở đây"
            />
            <Button onClick={onAddPromotion} className="ml-8">
              Sử dụng
            </Button>
          </div>

          <div className="flex mt-3">
            {cart?.promotions.map((promotion) => (
              <Tag
                className="flex bg-black text-white items-center"
                onClose={onRemovePromotion.bind(this, promotion.code)}
                closeIcon={<AiOutlineClose color="white" />}
                closable
              >
                <span>{promotion.code}</span>
              </Tag>
            ))}
          </div>

          {products.map((product) => (
            <div key={product._id} className="my-6">
              <OrderProduct editable={true} product={product} />
            </div>
          ))}

          {!products.length && (
            <p className="text-xl select-none text-gray-300 mt-5">
              Thêm sản phẩm vào giỏ hàng và chúng sẽ hiển thị ở đây.
            </p>
          )}
        </div>
      </ScrollBar>
      {/* FOOTER */}

      <div className="absolute text-white flex bg-black -bottom-[52px] rounded-t-2xl left-0 right-0 w-full h-[100px]">
        <div className="flex justify-between mx-[64px] my-[28px] text-white w-full">
          <div className="flex flex-col">
            <p className="font-medium text-sm">Tổng tiền:</p>
            <p className="font-light text-xl"><Counter from={0} to={totalPrice} duration={0.5} format={totalPriceFormatter} /> VND</p>
          </div>
          <div>
            <button
              onClick={onNext}
              className="rounded-full h-full px-[55px] py-[12px] bg-white text-black"
            >
              Thanh Toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
