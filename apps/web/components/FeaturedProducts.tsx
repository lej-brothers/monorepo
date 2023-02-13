import Image from "next/image";

import PhinIcon from "../public/phin-icon.png";
import DripperIcon from "../public/dripper-icon.png";

import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import Product from "./Product";

const FeaturedProducts = () => {
  const { data: categoryData } = useCategories();
  const categories = categoryData?.docs || [];

  const haveRobusta = categories.find(
    (category) => category.slug === "robusta"
  )?._id;

  const haveArabrica = categories.find(
    (category) => category.slug === "robusta"
  )?._id;

  const { data: robustaData } = useProducts(
    1,
    5,
    {
      categories: haveRobusta ? [haveRobusta] : [],
    },
    { enabled: !!haveRobusta }
  );

  const { data: arabricaData } = useProducts(
    1,
    5,
    {
      categories: haveArabrica ? [haveArabrica] : [],
    },
    { enabled: !!haveArabrica }
  );

  const robustaProducts = robustaData?.docs || [];
  const arabricaProducts = arabricaData?.docs || []

  return (
    <>
      {/* START BLOCK */}
      <Image src={PhinIcon.src} width={121} height={83} alt="Phin Icon" />
      <span className="my-10 mb-5 text-3xl text-center">
        Tuyệt vời nhất cho
        <br />
        <span className="text-[#CC81AE]">Expresso và Phin</span>
      </span>
      {robustaProducts.map((item) => (
        <div key={item._id} className="my-10 w-[332px] mb-[80px]">
          <Product product={item} />
        </div>
      ))}
      <button className="bg-black mt-3 hover:bg-gray-700 text-white py-2 px-4 rounded-full">
        See More
      </button>
      {/** END BLOCK */}
      <Image
        className="mt-20"
        src={DripperIcon.src}
        width={121}
        height={83}
        alt="dripper Icon"
      />
      <span className="my-10 mb-5 text-3xl text-center">
        Tuyệt vời nhất cho
        <br />
        <span className="text-[#81BFCC]">Handbrew and Coldbrew</span>
      </span>
      {arabricaProducts.map((item) => (
        <div key={item._id} className="my-10 w-[332px] mb-[80px]">
          <Product product={item} />
        </div>
      ))}
      <button className="bg-black mt-3 hover:bg-gray-700 text-white py-2 px-4 rounded-full">
        See More
      </button>
    </>
  );
};

export default FeaturedProducts;
