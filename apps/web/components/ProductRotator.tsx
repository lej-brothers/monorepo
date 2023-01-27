/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
// import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import { motion } from "framer-motion";
import { IProduct } from "common";

import CoffeeTopImage from "../../../../../public/coffee-top.png";

export const NEXT_POSITION: { [key: number]: number } = {
  1: 2,
  2: 3,
  3: 1,
};

export const PREVIOUS_POSITION: { [key: number]: number } = {
  1: 3,
  2: 1,
  3: 2,
};

const TRANSISTION = {
  type: "spring",
  damping: 100,
  stiffness: 1000,
  ease: [0.17, 0.67, 0.83, 0.67],
};

interface Props {
  products: [IProduct, IProduct, IProduct];
}

const ProductRotator = ({ products }: Props) => {
  const DEFAULT_POSITION = {
    [products[0]._id]: 1,
    [products[1]._id]: 2,
    [products[2]._id]: 3,
  };

  const POSTION_MAP: { [key: number]: any } = {
    1: { left: 20, top: -20, width: 150, height: 200, rotate: -25 },
    2: {
      zIndex: 1,
      rotate: 0,
      left: "calc(50% - 110px)",
      top: -120,
      width: 220,
      height: 320,
    },
    3: { right: 20, top: -20, width: 150, height: 200, rotate: 25 },
  };

  const [position, setPosition] = useState(DEFAULT_POSITION);

  const highlightedProduct =
    position[products[0]._id] === 1
      ? products[0]
      : position[products[1]._id] === 1
      ? products[1]
      : position[products[2]._id] === 1
      ? products[2]
      : products[0];

  const onNext = () => {
    setPosition({
      [products[0]._id]: NEXT_POSITION[position[products[0]._id]],
      [products[1]._id]: NEXT_POSITION[position[products[1]._id]],
      [products[2]._id]: NEXT_POSITION[position[products[2]._id]],
    });
  };

  const onPre = () => {
    setPosition({
      [products[0]._id]: PREVIOUS_POSITION[position[products[0]._id]],
      [products[1]._id]: PREVIOUS_POSITION[position[products[1]._id]],
      [products[2]._id]: PREVIOUS_POSITION[position[products[2]._id]],
    });
  };

  return (
    <div
      style={{
        backgroundRepeat: "no-repeat",
        background: `url(${CoffeeTopImage.src})`,
        backgroundSize: "cover",
      }}
      className="flex justify-center items-end h-[90vh] w-full"
    >
      <div className="flex mt-[80px] flex-col justify-center items-center bg-white w-full max-w-3xl h-[60%] rounded-tl-full rounded-tr-full relative">
        <motion.div
          layout
          className="absolute select-none"
          key={products[0]._id}
          style={{ ...POSTION_MAP[position[products[0]._id]] }}
          transition={TRANSISTION}
        >
          <img src={products[0].images[0].url!} alt={products[0]._id} />
        </motion.div>

        <motion.div
          layout
          className="absolute select-none"
          key={products[1]._id}
          style={{ ...POSTION_MAP[position[products[1]._id]] }}
          transition={TRANSISTION}
        >
          <img src={products[1].images[0].url!} alt={products[1]._id} />
        </motion.div>

        <motion.div
          layout
          className="absolute select-none"
          key={products[2]._id}
          style={{ ...POSTION_MAP[position[products[2]._id]] }}
          transition={TRANSISTION}
        >
          <img src={products[2].images[0].url!} alt={products[2]._id} />
        </motion.div>

        <h3 className="lg:mt-[150px] mt-[150px] text-4xl font-medium">
          Sản phẩm nổi bật
        </h3>

        <div className="select-none w-full flex mt-8">
          <div className="flex justify-center space-between items-center flex-1">
            <button
              onClick={onPre}
              className="flex bg-[#F8F8F8] justify-center items-center rounded-xl cursor-pointer w-[40px] h-[40px]"
            >
              {"<"}
            </button>
          </div>
          <div
            style={{ flex: "3 1 0" }}
            className="flex flex-3 grow-0 shrink-0 break-words flex-col justify-center items-center"
          >
            <motion.p
              className="text-[#CC8181] font-normal text-sm mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {highlightedProduct.title[0].value}
            </motion.p>
            <motion.p
              className="text-base font-medium mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {highlightedProduct.description[0].value}
            </motion.p>
            <motion.p
              className="text-base text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {highlightedProduct.warehourse.price}
            </motion.p>
          </div>
          <div className="flex justify-center items-center flex-1">
            <button
              onClick={onNext}
              className="flex justify-center items-center bg-[#F8F8F8] rounded-xl cursor-pointer w-[40px] h-[40px]"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRotator;
