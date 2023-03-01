import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppstoreOutlined, GiftOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { FormattedMessage } from "react-intl";

type MenuItem = Required<MenuProps>["items"][number];
const { Sider } = Layout;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <FormattedMessage id="product" />,
    "1",
    <Link to="/products">
      <AppstoreOutlined />
    </Link>
  ),
  getItem(
    <FormattedMessage id="order" />,
    "2",
    <Link to="/orders">
      <AppstoreOutlined />
    </Link>
  ),
  getItem(
    <FormattedMessage id="promotion" />,
    "3",
    <Link to="/promotions">
      <GiftOutlined />
    </Link>
  ),
  // getItem("Option 2", "2", <DesktopOutlined />),
  // getItem("User", "sub1", <UserOutlined />, [
  //   getItem("Tom", "3"),
  //   getItem("Bill", "4"),
  //   getItem("Alex", "5"),
  // ]),
  // getItem("Team", "sub2", <TeamOutlined />, [
  //   getItem("Team 1", "6"),
  //   getItem("Team 2", "8"),
  // ]),
  // getItem("Files", "9", <FileOutlined />),
];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{
          height: 32,
          margin: 16,
          background: "rgba(255, 255, 255, 0.2)",
        }}
      />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default SideBar;
