import Pagination from "@mui/material/Pagination";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import BeansIcon from "../../public/beans-icon.png";
import useProducts from "../../hooks/useProducts";
import Product from "../../components/Product";
import Layout from "../../components/Layout";

const Store = () => {
  const router = useRouter();
  const { page, offset } = router.query;

  const { data, isSuccess } = useProducts();

  /** MAPPED-VALUES */
  const products = data?.docs || [];
  const TOTAL_PAGE = data?.totalPages || 1;

  /* SIDE-EFFECTS */
  useEffect(() => {
    if (!page)
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: 1 },
      });
  }, [page, router]);

  /* MAIN RETURN */
  return (
    <>
      {/* <Head title="Store" description="Explore all of our products." /> */}
      <div className="flex mt-[50px] flex-col">
        <div className="flex mx-[60px] justify-start items-center w-full h-[44px]">
          <button
            onClick={() => router.push("/")}
            className="z-[100] flex btn justiyf-center align-center"
          >
            <FaArrowLeft size="20px" className="mt-[2px] mr-2" />{" "}
            <span className="text-normal">Quay lại</span>
          </button>
        </div>
        <div className="flex mt-[50px] flex-col justify-center items-center">
          <Image
            src={BeansIcon.src}
            alt="beans-icon"
            width={177}
            height={122}
          />
          <h3 className="font-normal my-4 text-3xl">Cà Phê</h3>
        </div>
        <div className="flex mb-[60px] w-full justify-center">
          <div className="mt-10 mx-8 grid lg:grid-cols-3 md:rid-cols-3 sm:rid-cols-1 gap-[40px]">
            {products.map((item) => (
              <div key={item._id} className="my-10 w-[300px]">
                <Product product={item} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mb-[80px] flex justify-center">
          <Pagination
            // color="primary"
            page={Number(page) || 1}
            count={TOTAL_PAGE}
          />
        </div>
      </div>
    </>
  );
};

Store.getLayout = (page: any) => <Layout>{page}</Layout>;

export default Store;
