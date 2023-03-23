"use client";

import React, { ReactNode } from "react";
import { BrowserView, MobileView } from "react-device-detect";

import { CartDrawer } from "../Cart/components";
import Navbar from "../Navbar";
import OrderDrawer from "../Order/Drawer";
import SearchDrawer from "../Search/components/Drawer";
import MobileNavbar from "../MobileNavbar";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <BrowserView>
        <Navbar />
      </BrowserView>
      <MobileView>
        <MobileNavbar />
      </MobileView>
      <main className="relative">{children}</main>
      <CartDrawer />
      <SearchDrawer />
      <OrderDrawer />
    </div>
  );
};

export default Layout;
