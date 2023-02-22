/* eslint-disable @next/next/no-img-element */
import useProduct from "../../../../hooks/useProduct";
import format from "../../../../utils/format";
import Ratio from "../../../Ratio";
import useCart from "../../../../hooks/useCart";
import { ICartProduct } from "common";

interface Props {
  product: ICartProduct;
  editable: boolean;
}

const OrderProduct = ({ product, editable = true }: Props) => {
  const { removeProduct, addProduct, updateQuantity } = useCart();
  const { data, isLoading } = useProduct(product.slug);

  if (isLoading || !data) return <></>;

  const firstImage = data.images[0]!;

  const price = format("vi-VN", "VND", product.price * product.quantity);

  const onChange = (newQuantity: number) => {
    updateQuantity(product._id, newQuantity);
  };

  const onRemove = () => {
    removeProduct(product._id);
  };

  return (
    <div className="flex w-[343px] h-[156px] rounded-lg bg-stone-100">
      <div className="basis-[82px] pl-2 flex justify-center items-center">
        <img
          className="w-[78px] h-[142px]"
          src={firstImage.url}
          alt={firstImage._id!}
        />
      </div>
      <div className="flex-1 flex pt-[24px] pl-[24px] flex-col">
        <p className="text-base mb-[12px] font-medium">{data.title}</p>
        <p className="text-sm mb-[12px] text-[#9A9A9A]">{price} VND</p>
        {editable && (
          <Ratio
            step={1}
            className="w-[159px]"
            onRemove={onRemove}
            onChange={onChange}
            value={product.quantity}
            max={100}
            min={1}
          />
        )}
      </div>
    </div>
  );
};

export default OrderProduct;
