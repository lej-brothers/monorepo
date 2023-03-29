import { ReactElement } from "react";
import Layout from "../../../components/Layout";
import { BrowserView, MobileView } from "react-device-detect";

import Setup from "../../../components/About/setup";
import SetupMobile from "../../../components/About/setup.mobile";

const Page = () => {
  return (
    <>
      <BrowserView>
        <Setup />
      </BrowserView>
      <MobileView>
        <SetupMobile />
      </MobileView>
    </>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Page;
