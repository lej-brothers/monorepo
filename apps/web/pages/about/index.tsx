"use client";

import {
  BrowserView,
  MobileView,
  TabletView,
  isTablet,
} from "react-device-detect";
import AboutComponent from "../../components/About/index";
import AboutMobile from "../../components/About/index.mobile";
import { ReactElement } from "react";
import Layout from "../../components/Layout";

const About = () => {
  return (
    <>
      <BrowserView>
        <AboutComponent />
      </BrowserView>
      <TabletView>
        <AboutComponent />
      </TabletView>
      {!isTablet && (
        <MobileView>
          <AboutMobile />
        </MobileView>
      )}
    </>
  );
};

About.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default About;
