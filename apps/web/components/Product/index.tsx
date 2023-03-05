/* eslint-disable @next/next/no-img-element */
import { IProduct } from "common";
import Image from "next/image";
import Link from "next/link";
import format from "../../utils/format";
import { ReactNode } from "react";
import styled from "styled-components";
import { CATEGORY_COLOR } from "../../constants/CATEGORY_COLOR";

interface Props {
  className?: string;
  product: IProduct;
  children?: ReactNode;
  disableCategory?: boolean;
  price?: string;
}

const Product = ({
  className = "",
  product,
  disableCategory = false,
  children,
}: Props) => {
  const formatedPrice = format(
    "vi-VN",
    "VND",
    product.warehourse.price as number
  );

  return (
    <Link href={`/products/${product.slug}`} passHref>
      <Container
        className={`bg-stone-100 break-normal cursor-pointer select-none items-center w-full ${
          children ? "p-3 h-[240px]" : "h-[130px]"
        } rounded flex justify-center ${className}`}
      >
        <div className="basis-[122px] h-full relative">
          <img
            className={`absolute ${children ? "" : "-top-6 left-0"}`}
            src={product.images[0].url!}
            alt={product.title}
            width="80%"
          />
        </div>

        <div className="flex-1 flex flex-col justify-start">
          {!disableCategory && (
            <p
              className="text-sm text-gray-500"
              style={{ color: CATEGORY_COLOR[product.categories[0].name] }}
            >
              {product.categories[0].name}
            </p>
          )}
          <h3 className="font-medium mb-2 text-black text-base">{product.title}</h3>
          <p className="text-sm text-gray-500">{formatedPrice} VND</p>
          {children}
        </div>
      </Container>
    </Link>
  );
};

export default Product;

const Container = styled.div`
  transition: 250ms all;
  background-color: rgb(245 245 244);

  :hover {
    background-color: #e5e5e5;
  }
`;
