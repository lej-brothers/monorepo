import Image from "next/image";
import ProductRotator from "../components/ProductRotator";
import LandingPageTopBg from "../public/landing-page-top-bg.png";
import useProducts from "../hooks/useProducts";
import Collection from "../components/Collection";
import FeaturedProducts from "../components/FeaturedProducts";
import { ReactElement } from "react";
import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import Services from "../components/Services";
import Head from "next/head";
import styled from "styled-components";
import { BrowserView, MobileView, isMobile } from "react-device-detect";
import HighlightedProductSlider from "../components/HighlightedProductSlider";
import LejCompactLogoWhite from "../public/lej-compact-logo-white.png";

const ScrollBar = dynamic(() => import("react-scrollbar"), { ssr: false });

export default function Web() {
  const products = useProducts();

  const first3 = products.data?.docs?.slice(0, 3);

  return (
    <>
      <Head>
        <title>Le J` Cafe - Trang chủ</title>
      </Head>
      <ScrollBar smoothScrolling className="h-[100vh]">
        <section
          className={`relative flex justify-center items-end ${
            isMobile ? "h-[70vh]" : "h-[100vh]"
          } w-full`}
        >
          <BrowserView>
            <div className="absolute left-0 right-0 ml-[auto] mr-[auto] z-10 bottom-0 flex mt-[0px] flex-col justify-center items-center bg-white w-full max-w-3xl h-[60%] rounded-tl-full rounded-tr-full">
              {first3 && <ProductRotator products={first3 as any} />}
            </div>
          </BrowserView>

          <MobileView>
            <Image
              className="absolute top-0 bottom-0 left-0 right-0 z-[11] mt-[auto] mb-[auto] mr-[auto] ml-[auto]"
              src={LejCompactLogoWhite.src}
              width={45}
              height={49}
              alt="lej-compact-logo-white"
            />
          </MobileView>

          <TopBackground className="relative" isMobile={isMobile}>
            <MobileView>
              <div className="absolute flex z-10 -bottom-11 w-full max-w-3xl h-[60%]">
                {first3 && (
                  <HighlightedProductSlider products={first3 as any} />
                )}
              </div>
            </MobileView>
          </TopBackground>
        </section>

        <section className="flex justify-center bg-black">
          <div className="flex flex-col justify-center items-center bg-white w-full max-w-3xl h-[100%] py-12">
            <FeaturedProducts />
          </div>
        </section>

        <section className="flex justify-center bg-black">
          <div className="flex flex-col justify-center items-center bg-white w-full max-w-3xl h-[100%] py-12">
            <Collection />
          </div>
        </section>

        <section className="flex justify-center mb-[250px] bg-black">
          <div className="flex flex-col justify-center items-center bg-white w-full max-w-3xl h-[100%] py-12">
            <Services />
          </div>
        </section>
      </ScrollBar>
    </>
  );
}

Web.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

/**
 * Styles
 */

const TopBackground = styled.section<{ isMobile: boolean }>`
  top: 0;
  position: absolute;
  width: 100vw;
  height: ${({ isMobile }) => (isMobile ? "100%" : "100%")};
  background: url(${LandingPageTopBg.src});
  background-repeat: no-repeat;
  background-posiiton: center top;
  background-size: cover;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 1) 100%
      ),
      url(/assets/img/rests/scenery.jpg);
  }
`;
