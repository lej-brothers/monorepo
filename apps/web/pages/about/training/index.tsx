import { ReactElement } from "react";
import Layout from "../../../components/Layout";
import {
  BrowserView,
  MobileView,
  TabletView,
  isTablet,
} from "react-device-detect";

import TraniningWebView from "../../../components/About/training";
import TraniningMobileView from "../../../components/About/training.mobile";

const Setup = () => {
  return (
    <>
      <BrowserView>
        <TraniningWebView />
      </BrowserView>
      <TabletView>
        <TraniningWebView />
      </TabletView>
      {!isTablet && (
        <MobileView>
          <TraniningMobileView />
        </MobileView>
      )}
    </>
  );
};

Setup.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Setup;
