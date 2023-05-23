import { BorderlessTableOutlined } from '@ant-design/icons';
import type { MenuProps } from "antd";
import Link from "next/link";

export const ITEMS: MenuProps["items"] = [
  {
    key: "1",
    label: <Link className='flex items-center' href="/orders"><BorderlessTableOutlined rev="123" className='mr-1'/>
    Orders</Link>,
  },
];
