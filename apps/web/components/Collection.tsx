import Image from "next/image";

import BeanIcon from "../public/coffee-beans-icon.png";
import SliceIcon from "../public/slice-icon.png";
import CafeIcon from "../public/cafe-icon.png";
import Link from "next/link";
import { useRouter } from "next/router";

const Collection = () => {

  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <span className="text-xl mb-8 font-normal">Bộ sưu tập</span>
      <div className="grid w-full lg:px-[64px] px-[32px] grid-cols-3 gap-4">
          <button  onClick={() => router.push("/products?categories=robusta")} className="btn border-[1px] h-[88px] flex flex-col justify-center items-center border-black rounded">
            <Image
              src={BeanIcon.src}
              width={32}
              height={32}
              alt="coffee-bean-icon"
            />
            <span>Robusta</span>
          </button>

          <button onClick={() => router.push("/products?categories=arabica")} className=" btn border-[1px] h-[88px] flex flex-col justify-center items-center border-black rounded">
            <Image
              src={BeanIcon.src}
              width={32}
              height={32}
              alt="coffee-bean-icon"
            />
            <span>Arabica</span>
          </button>

          <button onClick={() => router.push("/products?categories=blend")} className="btn border-[1px] h-[88px] flex flex-col justify-center items-center border-black rounded">
            <Image
              src={SliceIcon.src}
              width={32}
              height={32}
              alt="slice-icon"
            />
            <span>Blend</span>
          </button>
      </div>
      <div className="grid w-full lg:px-[64px] px-[32px]">
          <button onClick={() => router.push("/products?categories=merchandise")} className="mt-4 btn flex flex-col h-[88px] justify-center items-center border-[1px] border-black rounded">
            <Image src={CafeIcon.src} width={32} height={32} alt="slice-icon" />
            <span>Merchandise</span>
          </button>
      </div>
    </div>
  );
};

export default Collection;
