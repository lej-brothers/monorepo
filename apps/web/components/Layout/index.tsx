"use client";

import React, { ReactNode } from "react";
import { CartDrawer } from "../Cart/components";
import Navbar from "../Navbar";
import OrderDrawer from "../Order/Drawer";
import SearchDrawer from "../Search/components/Drawer";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="relative">{children}</main>
      <CartDrawer />
      <SearchDrawer />
      <OrderDrawer />
    </div>
  );
};

export default Layout;
