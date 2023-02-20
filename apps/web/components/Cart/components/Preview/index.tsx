import { ICart } from "common";
import OrderProduct from "../Product";
import format from "../../../../utils/format";
import { ORDER_TABS } from "../../constants";

interface Props {
  cart: ICart;
  onChange: (key: ORDER_TABS) => void;
}

const Preview = ({ cart, onChange }: Props) => {
  const products = cart?.products || [];

  const totalPrice = products.reduce((pre, cur) => {
    return pre + cur.price * cur.quantity;
  }, 0);

  const totalPriceFormatted = format("vi-VN", "VND", totalPrice);

  const onNext = () => onChange(ORDER_TABS.USER_INFO);

  return (
    <>
      <div className="px-[74px]">
        <p className="text-4xl">Giỏ hàng</p>
        {products.map((product) => (
          <div key={product._id} className="my-6">
            <OrderProduct product={product} />
          </div>
        ))}
      </div>
      {/* FOOTER */}
      <div className="absolute text-white flex bg-black bottom-0 rounded-t-2xl left-0 right-0 w-full h-[100px]">
        <div className="flex justify-between mx-[64px] my-[28px] text-white w-full">
          <div className="flex flex-col">
            <p className="font-medium text-sm">Tổng tiền:</p>
            <p className="font-light text-xl">{totalPriceFormatted} VND</p>
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
    </>
  );
};

export default Preview;
