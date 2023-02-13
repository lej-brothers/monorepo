import { IProduct } from "common";
import Image from "next/image";
import Link from "next/link";
import format from "../../utils/format";
import { ReactNode } from "react";

interface Props {
  className?: string;
  product: IProduct;
  children?: ReactNode;
  price?: string;
}

const Product = ({ className = "", product, price, children }: Props) => {
  const formatedPrice = format(
    "vi-VN",
    "VND",
    product.warehourse.price as number
  );

  return (
    <Link href={`/products/${product.slug}`} passHref>
      <div
        className={`bg-stone-100 break-normal cursor-pointer select-none items-center w-full ${
          children ? "p-3 h-[240px]" : "h-[130px]"
        } rounded flex justify-center ${className}`}
      >
        <div className="basis-[122px] h-full relative">
          <Image
            className={`absolute ${children ? "" : "-top-8 left-0"}`}
            src={product.images[0].url!}
            alt={product.title}
            width={122}
            height={166}
          />
        </div>

        <div className="flex-1 flex flex-col justify-start ml-2">
          <h3 className="font-medium mb-2 text-base">{product.title}</h3>
          <p className="text-base text-gray-500">
            {price
              ? price
              : product.isMetch
              ? `${formatedPrice} VND`
              : `${formatedPrice} VND / 100g`}
          </p>
          {children}
        </div>
      </div>
    </Link>
  );
};

export default Product;
