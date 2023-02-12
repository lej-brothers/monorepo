import React from "react";
import { Dropdown, Space } from "antd";
import { ITEMS } from './constants'

interface Props {
  children: React.ReactNode;
}

const CartDropdown = ({ children }: Props) => {

  return <Dropdown menu={{ items: ITEMS }} >{children}</Dropdown>;
};

export default CartDropdown;
