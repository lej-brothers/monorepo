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

const ITEMS: MenuItem[] = [
  getItem(
    <FormattedMessage id="insights" />,
    "/insights",
    <Link to="/insights">
      <AppstoreOutlined />
    </Link>
  ),
  getItem(
    <FormattedMessage id="product" />,
    "/product",
    <Link to="/products">
      <AppstoreOutlined />
    </Link>
  ),
  getItem(
    <FormattedMessage id="order" />,
    "/order",
    <Link to="/orders">
      <AppstoreOutlined />
    </Link>
  ),
  getItem(
    <FormattedMessage id="promotion" />,
    "/promotion",
    <Link to="/promotions">
      <GiftOutlined />
    </Link>
  ),
];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const selected = ITEMS.find((item) =>
    window.location.pathname.includes(item!.key as string)
  )?.key || 'products';

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
        selectedKeys={[selected as string]}
        mode="inline"
        items={ITEMS}
      />
    </Sider>
  );
};

export default SideBar;
