import { Drawer } from "antd";
import { VscChromeClose } from "react-icons/vsc";
import Link from "next/link";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const NavigationDrawer: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Drawer
      closable={false}
      placement="left"
      open={open}
      onClose={onClose}
      width="100vw"
    >
      <div className="w-full flex flex-col px-2">
        <VscChromeClose
          onClick={onClose}
          className="mb-8 -ml-2 cursor-pointer transistion-all hover:text-stone-500"
          size={46}
        />
        <Link passHref onClick={onClose} href="/products">
          <p className="text-3xl mb-5">Sản phẩm</p>
        </Link>

        <Link passHref onClick={onClose} href="/about">
          <p className="text-3xl">Về chúng tôi</p>
        </Link>
      </div>
    </Drawer>
  );
};

export default NavigationDrawer;
