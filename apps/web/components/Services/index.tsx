import Image from "next/image";
import React from "react";

import Link from "next/link";
import CafeIcon from "../../public/cafe-icon.png";
import BeanIcon from "../../public/coffee-beans-icon.png";
import CoffeeMaker from "../../public/coffee-maker.png";

const Services = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <span className="text-xl mb-8 font-normal">Dịch vụ</span>
      <div className="grid w-full lg:px-[64px] px-[32px] grid-cols-3 gap-4">
        <Link
          className="mt-4 btn flex flex-col h-[88px] justify-center items-center border-[1px] border-black rounded"
          href="/about/setup"
          passHref
        >
          <button className="flex flex-col justify-center items-center">
            <Image
              src={CoffeeMaker.src}
              width={32}
              height={32}
              alt="coffee-bean-icon"
            />
            <span>Setup</span>
          </button>
        </Link>

        <Link
          className="mt-4 btn flex flex-col h-[88px] justify-center items-center border-[1px] border-black rounded"
          href="/about/training"
          passHref
        >
          <button className="flex flex-col justify-center items-center">
            <Image
              src={CafeIcon.src}
              width={32}
              height={32}
              alt="coffee-bean-icon"
            />
            <span>Training</span>
          </button>
        </Link>
        <Link
          className="mt-4 btn flex flex-col h-[88px] justify-center items-center border-[1px] border-black rounded"
          href="/about/supply"
          passHref
        >
          <button className="flex flex-col justify-center items-center">
            <Image
              src={BeanIcon.src}
              width={32}
              height={32}
              alt="coffee-bean-icon"
            />
            <span>Supply</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Services;
