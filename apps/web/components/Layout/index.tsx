"use client";

import React, { ReactNode } from "react";
import Navbar from "../Navbar";
import { CartDrawer } from "../Cart/components";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  return (
    <div>
      <Navbar />
      <main className="relative">{children}</main>
      <CartDrawer />
    </div>
  );
};

export default Layout;
