import React, { Suspense, useEffect } from "react";
import { Layout } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { SideBar } from "../components";

const { Content, Footer } = Layout;

const Root: React.FC = () => {
  const nativate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname) {
      nativate("/products");
    }
  }, []);

  return (
    <Suspense fallback={<>Loading..</>}>
      <Layout style={{ minHeight: "100vh" }}>
        <SideBar />
        <Layout className="site-layout">
          <Content>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Le'J Coffee Dashboard ©2023 Created by Garfdev
          </Footer>
        </Layout>
      </Layout>
    </Suspense>
  );
};

export default Root;
