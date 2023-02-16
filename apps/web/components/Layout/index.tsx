"use client";

import React, { ReactNode } from "react";
import Navbar from "../Navbar";
import { OrderDrawer } from "../Order/components/";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="relative">{children}</main>
      <OrderDrawer />
    </div>
  );
};

export default Layout;
