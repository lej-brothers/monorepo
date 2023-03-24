import Image from "next/image";

import PhinIcon from "../public/phin-icon.png";
import DripperIcon from "../public/dripper-icon.png";

import useProducts from "../hooks/useProducts";
import Product from "./Product";
import { useRouter } from "next/router";
import { BrowserView, isMobile } from "react-device-detect";

const FeaturedProducts = () => {
  const router = useRouter();

  const { data: robustaData } = useProducts(1, 5, {
    categories: "espresso-phin",
  });

  const { data: arabicaData } = useProducts(1, 5, {
    categories: "handbrew-coldbrew",
  });

  const robustaProducts = robustaData?.docs || [];
  const arabicaProducts = arabicaData?.docs || [];

  const pushToCategory = (categories: string) => {
    router.push({
      pathname: "/products",
      query: {
        categories,
      },
    });
  };

  return (
    <>
      {/* START BLOCK */}
      <BrowserView>
        <Image src={PhinIcon.src} width={121} height={83} alt="Phin Icon" />
      </BrowserView>
      <span
        className={`my-10 mb-5 text-3xl ${
          isMobile ? "mr-[auto] ml-10 text-left" : "text-center"
        }`}
      >
        Tuyệt vời nhất cho
        <br />
        <span className="text-[#CC81AE]">Espresso và Phin</span>
      </span>
      {robustaProducts.map((item) => (
        <div key={item._id} className="my-10 w-[332px] mb-[80px]">
          <Product disableCategory product={item} />
        </div>
      ))}
      <button
        onClick={pushToCategory.bind(this, "espresso-phin")}
        className="bg-black mt-3 hover:bg-gray-700 text-white py-2 px-4 rounded-full"
      >
        See More
      </button>
      {/** END BLOCK */}
      <BrowserView>
        <Image
          className="mt-20"
          src={DripperIcon.src}
          width={121}
          height={83}
          alt="dripper Icon"
        />
      </BrowserView>

      <span
        className={`my-10 mb-5 text-3xl ${
          isMobile ? "mr-[auto] ml-10 text-left" : "text-center"
        }`}
      >
        Tuyệt vời nhất cho
        <br />
        <span className="text-[#81BFCC]">Handbrew and Coldbrew</span>
      </span>
      {arabicaProducts.map((item) => (
        <div key={item._id} className="my-10 w-[332px] mb-[80px]">
          <Product disableCategory product={item} />
        </div>
      ))}
      <button
        onClick={pushToCategory.bind(this, "handbrew-coldbrew")}
        className="bg-black mt-3 hover:bg-gray-700 text-white py-2 px-4 rounded-full"
      >
        See More
      </button>
    </>
  );
};

export default FeaturedProducts;
