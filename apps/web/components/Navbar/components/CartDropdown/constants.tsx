import { BorderlessTableOutlined } from '@ant-design/icons';
import type { MenuProps } from "antd";
import Link from "next/link";

export const ITEMS: MenuProps["items"] = [
  {
    key: "1",
    label: <Link className='flex items-center' rev="123" href="/orders"><BorderlessTableOutlined  className='mr-1'/>
    Orders</Link>,
  },
];
