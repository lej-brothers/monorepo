import dynamic from "next/dynamic";
import { ReactElement } from "react";
import Layout from "../../../components/Layout";
import {
  BrowserView,
  MobileView,
  TabletView,
  isTablet,
} from "react-device-detect";

const ScrollBar = dynamic(() => import("react-scrollbar"), { ssr: false });

import SupplyWebView from "../../../components/About/supply";
import SupplyMobileView from "../../../components/About/supply.mobile";

const Page = () => {
  return (
    <>
      <BrowserView>
        <SupplyWebView />
      </BrowserView>

      <TabletView>
        <SupplyWebView />
      </TabletView>

      {!isTablet && (
        <MobileView>
          <SupplyMobileView />
        </MobileView>
      )}
    </>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Page;
