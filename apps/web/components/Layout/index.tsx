"use client";

import React, { ReactNode } from "react";
import {
  BrowserView,
  MobileView,
  TabletView,
  isTablet,
} from "react-device-detect";

import { CartDrawer } from "../Cart/components";
import Navbar from "../Navbar";
import OrderDrawer from "../Order/Drawer";
import SearchDrawer from "../Search/components/Drawer";
import MobileNavbar from "../MobileNavbar";

import { Props as MobileProps } from "../MobileNavbar/index";

interface Props {
  mobileNavProps?: MobileProps;
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ mobileNavProps, children }) => {
  return (
    <div>
      <BrowserView>
        <Navbar />
      </BrowserView>
      <TabletView>
        <Navbar />
      </TabletView>
      {!isTablet && (
        <MobileView>
          <MobileNavbar {...mobileNavProps} />
        </MobileView>
      )}
      <main className="relative">{children}</main>
      <CartDrawer />
      <SearchDrawer />
      <OrderDrawer />
    </div>
  );
};

export default Layout;
