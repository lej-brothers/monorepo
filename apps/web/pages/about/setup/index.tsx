import { ReactElement } from "react";
import Layout from "../../../components/Layout";
import {
  BrowserView,
  MobileView,
  TabletView,
  isTablet,
} from "react-device-detect";

import Setup from "../../../components/About/setup";
import SetupMobile from "../../../components/About/setup.mobile";

const Page = () => {
  return (
    <>
      <BrowserView>
        <Setup />
      </BrowserView>
      <TabletView>
        <Setup />
      </TabletView>
      {!isTablet && (
        <MobileView>
          <SetupMobile />
        </MobileView>
      )}
    </>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Page;
