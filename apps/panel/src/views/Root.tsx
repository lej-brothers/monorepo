import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import { SideBar } from "../components";

const { Content, Footer } = Layout;

const Root: React.FC = () => {
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
