import React, { useEffect } from "react";
import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

import { SideBar } from "../components";

const { Content, Footer } = Layout;

const Root: React.FC = () => {
  const nativate = useNavigate();

  useEffect(() => {
    nativate("/products");
  }, [nativate]);

  return (
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
  );
};

export default Root;
