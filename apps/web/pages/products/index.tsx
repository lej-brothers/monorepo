import Pagination from "@mui/material/Pagination";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import styled from "styled-components";
import Layout from "../../components/Layout";
import Product from "../../components/Product";
import useProducts from "../../hooks/useProducts";
import BeansIcon from "../../public/beans-icon.png";
import { BrowserView, MobileView, isMobile } from "react-device-detect";

const ScrollBar = dynamic(() => import("react-scrollbar"), { ssr: false });

const Store = () => {
  const router = useRouter();
  const { page, categories } = router.query;

  const { data } = useProducts(Number(page), 20, {
    categories: categories as string,
  });

  /** MAPPED-VALUES */
  const products = data?.docs || [];
  const TOTAL_PAGE = data?.totalPages || 1;

  /** ON-BUTTON-CLICK */
  const onClick = (category?: string) => {
    router.query["categories"] = category;
    if (!category) delete router.query["categories"];

    router.push(router);
  };

  /* MAIN RETURN */
  return (
    <ScrollBar smoothScrolling className="h-[100vh]" contentClassName="pb-[250px]">
      {/* <Head title="Store" description="Explore all of our products." /> */}
      <div className="flex mt-[50px] flex-col">
        <div className="flex mt-[50px] flex-col justify-center items-center">
          <BrowserView>
            <Image
              src={BeansIcon.src}
              alt="beans-icon"
              width={177}
              height={122}
            />
          </BrowserView>
          <h3 className={`font-normal my-4 text-3xl ${isMobile && "mb-5"}`}>
            Cà Phê
          </h3>
        </div>

        <BrowserView>
          <div className="w-full flex justify-center">
            <Button
              onClick={onClick.bind(this, "espresso-phin")}
              active={categories === "espresso-phin"}
              className={`px-5 mr-2 py-2`}
            >
              Espresso và Phin
            </Button>
            <Button
              onClick={onClick.bind(this, undefined)}
              active={categories === undefined}
              className={`px-5 mr-2 py-2`}
            >
              Tất cả
            </Button>
            <Button
              onClick={onClick.bind(this, "handbrew-coldbrew")}
              active={categories === "handbrew-coldbrew"}
              className={`px-5 mr-2 py-2`}
            >
              Handbrew và Coldbrew
            </Button>
          </div>
        </BrowserView>

        <MobileView>
          <InvisibleScrollbar
            smoothScrolling
            className="w-full"
            contentClassName="w-[max-content] flex"
            vertical={true}
          >
            <Button
              onClick={onClick.bind(this, "espresso-phin")}
              active={categories === "espresso-phin"}
              className={`px-5 mx-2 py-2`}
            >
              Espresso và Phin
            </Button>
            <Button
              onClick={onClick.bind(this, undefined)}
              active={categories === undefined}
              className={`px-5 mx-2 py-2`}
            >
              Tất cả
            </Button>
            <Button
              onClick={onClick.bind(this, "handbrew-coldbrew")}
              active={categories === "handbrew-coldbrew"}
              className={`px-5 mx-2 py-2`}
            >
              Handbrew và Coldbrew
            </Button>
          </InvisibleScrollbar>
        </MobileView>

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
    </ScrollBar>
  );
};

Store.getLayout = (page: any) => <Layout>{page}</Layout>;

export default Store;

const Button = styled.button<{ active: boolean }>`
  transition: 250ms all;
  background: ${(props) => (props.active ? "black" : "#eeeeee")};
  color: ${(props) => (props.active ? "#ffffff" : "black")};
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background: ${(props) => (props.active ? "black" : "#e5e5e5")};
  }
`;

const InvisibleScrollbar = styled(ScrollBar)`
  .scrollbar {
    display: none;
  }
`;
