import Image from "next/image";
import { IProduct } from "common";
import React from "react";
import format from "../../../utils/format";

interface Props {
  product: IProduct;
}

const ProductCard: React.FC<Props> = ({ product }) => {

  const formattedPrice = format('vi-VN', 'VND', product.warehourse.price)

  return (
    <div className="w-[184px] h-[148px] flex flex-col justify-between overflow-y-visible ml-4 mr-4 bg-[#F8F8F8] px-4 py-6 rounded-lg relative">
      <h3 className="text-base font-semibold">{product.title}</h3>
      <p className="text-xs mt-1 font-normal text-[#AAAAAA]">{product.details}</p>
      <p className="text-sm mt-1">{formattedPrice} VND</p>
      <Image className="absolute -top-[125px] left-2" src={product.images[0].url} alt={product.slug} width={82} height={149} />
    </div>
  );
};

export default ProductCard;
