import Image from "next/image";

import BeanIcon from "../public/coffee-beans-icon.png";
import SliceIcon from "../public/slice-icon.png";
import CafeIcon from "../public/cafe-icon.png";

const Collection = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <span className="text-xl mb-8 font-normal">Bộ sưu tập</span>
      <div className="grid w-full px-[64px] grid-cols-3 gap-4">
        <button className="btn border-[1px] h-[88px] flex flex-col justify-center items-center border-black rounded">
          <Image
            src={BeanIcon.src}
            width={32}
            height={32}
            alt="coffee-bean-icon"
          />
          <span>Robusta</span>
        </button>
        <button className=" btn border-[1px] h-[88px] flex flex-col justify-center items-center border-black rounded">
          <Image
            src={BeanIcon.src}
            width={32}
            height={32}
            alt="coffee-bean-icon"
          />
          <span>Arabica</span>
        </button>
        <button className="btn border-[1px] h-[88px] flex flex-col justify-center items-center border-black rounded">
          <Image src={SliceIcon.src} width={32} height={32} alt="slice-icon" />
          <span>Blend</span>
        </button>
      </div>
      <div className="grid w-full px-[64px]">
        <button className="mt-4 btn flex flex-col h-[88px] justify-center items-center border-[1px] border-black rounded">
          <Image src={CafeIcon.src} width={32} height={32} alt="slice-icon" />
          <span>Merchandise</span>
        </button>
      </div>
    </div>
  );
};

export default Collection;
