import React from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { IProduct } from "common";
import ProductCard from "./components/ProductCard";

const ScrollBar = dynamic(() => import("react-scrollbar"), { ssr: false });

interface Props {
  products: [IProduct, IProduct, IProduct];
}

const HighlightedProductSlider: React.FC<Props> = ({ products }) => {
  return (
    <div className="w-[100vw] flex h-full">
      <InvisibleScrollbar
        smoothScrolling
        className="w-full h-full flex flex-col justify-end flex-1"
        contentClassName="w-[max-content] h-[145px] flex"
        contentStyle={{ overflow: 'visible' }}
        vertical={true}
      >
        <>
          {products.map((product) => (
            <ProductCard
              key={`product-top-slider` + product._id}
              product={product}
            />
          ))}
        </>
      </InvisibleScrollbar>
    </div>
  );
};

export default HighlightedProductSlider;

const InvisibleScrollbar = styled(ScrollBar)`
  .scrollbar {
    display: none;
  }
`;
