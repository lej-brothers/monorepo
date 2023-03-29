import { ReactElement } from "react";
import Layout from "../../../components/Layout";
import { BrowserView, MobileView } from "react-device-detect";

import TraniningWebView from "../../../components/About/training";
import TraniningMobileView from "../../../components/About/training.mobile";

const Setup = () => {
  return (
    <>
      <BrowserView>
        <TraniningWebView />
      </BrowserView>
      <MobileView>
        <TraniningMobileView />
      </MobileView>
    </>
  );
};

Setup.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Setup;
