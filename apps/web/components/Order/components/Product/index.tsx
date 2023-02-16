/* eslint-disable @next/next/no-img-element */
import { IOrderProduct } from "common";
import useProduct from "../../../../hooks/useProduct";
import Product from "../../../Product";
import format from "../../../../utils/format";
import Ratio from "../../../Ratio";
import Image from "next/image";

interface Props {
  product: IOrderProduct;
}

const OrderProduct = ({ product }: Props) => {
  const { data, isLoading } = useProduct(product.slug);

  if (isLoading || !data) return <></>;

  const firstImage = data.images[0]!;

  const price = format("vi-VN", "VND", product.price * product.quantity);

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
        <Ratio className="w-[159px]" value={100} min={1} max={100} />
      </div>
    </div>
  );
};

export default OrderProduct;
