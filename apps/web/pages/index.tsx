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
import {
  BrowserView,
  MobileView,
  isMobile,
  isTablet,
} from "react-device-detect";

const ScrollBar = dynamic(() => import("react-scrollbar"), { ssr: false });

export default function Web() {
  const featuredData = useProducts(1, 3, { isHighlight: true });

  const features = featuredData.data?.docs || [];

  return (
    <>
      <Head>
        <title>Le J` Cafe - Trang chủ</title>
      </Head>
      <ScrollBar contentClassName={`${isMobile ? 'pb-6' : ''}`} smoothScrolling className="h-[100vh]">
        <section
          className={`relative flex justify-center items-end ${
            isMobile && !isTablet ? "h-[70vh]" : "h-[100vh]"
          } w-full`}
        >
          <BrowserView>
            <div className="absolute left-0 right-0 ml-[auto] mr-[auto] z-10 bottom-0 flex mt-[0px] flex-col justify-center items-center bg-white w-full max-w-3xl h-[60%] rounded-tl-full rounded-tr-full">
              {features.length >= 3 && (
                <ProductRotator products={features as any} />
              )}
            </div>
          </BrowserView>

          <MobileView>
            <div className="absolute left-0 right-0 ml-[auto] mr-[auto] z-10 bottom-0 flex mt-[0px] flex-col justify-center items-center bg-white w-full max-w-3xl h-[60%] rounded-tl-full rounded-tr-full">
              {features.length >= 3 && (
                <ProductRotator products={features as any} />
              )}
            </div>
          </MobileView>

          {/* {!isTablet && (
            <MobileView>
              <Image
                className="absolute top-0 bottom-0 left-0 right-0 z-[11] mt-[auto] mb-[auto] mr-[auto] ml-[auto]"
                src={LejCompactLogoWhite.src}
                width={45}
                height={49}
                alt="lej-compact-logo-white"
              />
            </MobileView>
          )} */}

          <TopBackground
            className="relative"
            isMobile={isMobile && !isTablet}
          ></TopBackground>
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

        <section className="flex justify-center bg-black">
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
