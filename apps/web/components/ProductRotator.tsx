/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { motion } from "framer-motion";
import { IProduct } from "common";

import format from "../utils/format";
import Link from "next/link";
import { isMobile } from "react-device-detect";

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

const POSITION_MAP_MOBILE: { [key: number]: any } = {
  1: { left: -50, top: -20, width: 110, height: 150, rotate: -25 },
  2: {
    zIndex: 1,
    rotate: 0,
    left: "calc(50% - 75px)",
    top: -80,
    width: 150,
    height: 190,
  },
  3: { right: -50, top: -20, width: 110, height: 150, rotate: 25 },
}

const POSTION_MAP_DESKTOP: { [key: number]: any } = {
  1: { left: 20, top: -20, width: 110, height: 150, rotate: -25 },
  2: {
    zIndex: 1,
    rotate: 0,
    left: "calc(50% - 80px)",
    top: -120,
    width: 160,
    height: 200,
  },
  3: { right: 20, top: -20, width: 110, height: 150, rotate: 25 },
};

interface Props {
  products: [IProduct, IProduct, IProduct];
}

const ProductRotator = ({ products }: Props) => {
  const DEFAULT_POSITION: { [key: string]: number } = {
    [products[0]._id!]: 1,
    [products[1]._id!]: 2,
    [products[2]._id!]: 3,
  };

  const POSTION_MAP = isMobile ? POSITION_MAP_MOBILE : POSTION_MAP_DESKTOP

  const [position, setPosition] = useState(DEFAULT_POSITION);

  const highlightedProduct =
    position[products[0]._id!] === 1
      ? products[0]
      : position[products[1]._id!] === 1
      ? products[1]
      : position[products[2]._id!] === 1
      ? products[2]
      : products[0];

  const formatedPrice = format(
    "vi-VN",
    "VND",
    highlightedProduct.warehourse.price as number
  );

  const onNext = () => {
    setPosition({
      [products[0]._id!]: NEXT_POSITION[position[products[0]._id!]],
      [products[1]._id!]: NEXT_POSITION[position[products[1]._id!]],
      [products[2]._id!]: NEXT_POSITION[position[products[2]._id!]],
    });
  };

  const onPre = () => {
    setPosition({
      [products[0]._id!]: PREVIOUS_POSITION[position[products[0]._id!]],
      [products[1]._id!]: PREVIOUS_POSITION[position[products[1]._id!]],
      [products[2]._id!]: PREVIOUS_POSITION[position[products[2]._id!]],
    });
  };

  return (
    <>
      <motion.div
        layout
        className="absolute select-none"
        key={products[0]._id!}
        style={{ ...POSTION_MAP[position[products[0]._id!]] }}
        transition={TRANSISTION}
      >
        <img src={products[0].images[0].url} alt={products[0]._id!} />
      </motion.div>

      <motion.div
        layout
        className="absolute select-none"
        key={products[1]._id!}
        style={{ ...POSTION_MAP[position[products[1]._id!]] }}
        transition={TRANSISTION}
      >
        <img src={products[1].images[0].url!} alt={products[1]._id!} />
      </motion.div>

      <motion.div
        layout
        className="absolute select-none"
        key={products[2]._id!}
        style={{ ...POSTION_MAP[position[products[2]._id!]] }}
        transition={TRANSISTION}
      >
        <img src={products[2].images[0].url!} alt={products[2]._id!} />
      </motion.div>

      {!isMobile && <h3 className="lg:mt-[150px] mt-[150px] text-4xl font-medium">
        Sản phẩm nổi bật
      </h3>}

      {isMobile && <span className="mt-[100px]"></span>}

      <div className={`select-none w-full flex mt-8 ${isMobile && "mx-5"}`}>
        <div className="flex justify-end items-center flex-1">
          <button
            onClick={onPre}
            className="flex bg-[#F8F8F8] justify-center items-center rounded-xl cursor-pointer w-[40px] h-[40px]"
          >
            {"<"}
          </button>
        </div>
        <Link href={`/products/${highlightedProduct.slug}`} passHref>
          <div className={`flex ${isMobile ? 'w-[150px]' : ' w-[300px]'} mx-10 flex-col justify-center items-center`}>
            <motion.p
              className="text-[#CC8181] text-center font-normal text-xs mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {highlightedProduct.details}
            </motion.p>
            <motion.p
              className="text-xl text-center font-medium mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {highlightedProduct.title}
            </motion.p>
            <motion.p
              className="text-base text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {formatedPrice} VND
            </motion.p>
          </div>
        </Link>
        <div className="flex justify-start items-center flex-1">
          <button
            onClick={onNext}
            className="flex justify-center items-center bg-[#F8F8F8] rounded-xl cursor-pointer w-[40px] h-[40px]"
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductRotator;
