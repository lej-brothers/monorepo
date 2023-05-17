/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
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
  const { removeProduct, updateQuantity } = useCart();
  const { data, isLoading } = useProduct(product.slug);

  if (isLoading || !data) return <></>;

  const firstImage = data.images[0]!;
  const isDiscounted = product.afterPrice < product.price.price;

  const price = format("vi-VN", "VND", product.price.price * product.quantity);
  const afterPrice = format(
    "vi-VN",
    "VND",
    product.afterPrice * product.quantity
  );

  const onChange = async (newQuantity: number) => {
    await updateQuantity(product, newQuantity);
  };

  const onRemove = async () => {
    await removeProduct(product._id);
  };

  return (
    <div className="flex w-[343px] h-[156px] rounded-lg bg-stone-100">
      <div className="basis-[82px] pl-2 flex justify-center items-center">
        <Image
          className="w-[78px] h-[142px]"
          src={firstImage.url}
          alt={firstImage._id!}
          width={78}
          height={78}
        />
      </div>
      <div className="flex-1 flex pt-[24px] pl-[24px] flex-col">
        <p className="text-base mb-[12px] font-medium">{data.title} ({product.price.title})</p>
        <div className="flex mb-[12px]">
          <p className={`text-sm mr-2 ${isDiscounted && 'line-through text-gray-300'} text-[#9A9A9A]`}>{price} VND</p>
          {isDiscounted && (
            <p className="text-sm text-[#9A9A9A]">{afterPrice} VND</p>
          )}
        </div>
        {editable && (
          <Ratio
            step={1}
            className="w-[159px]"
            onRemove={onRemove}
            onChange={onChange}
            value={product.quantity}
            max={data.warehourse.count || 100}
            min={1}
          />
        )}
      </div>
    </div>
  );
};

export default OrderProduct;
