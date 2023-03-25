import { Divider, Drawer } from "antd";
import { AiOutlineRight } from "react-icons/ai";
import { FaHandPeace } from "react-icons/fa";
import Image from "next/image";
import { VscChromeClose } from "react-icons/vsc";
import Link from "next/link";
import React from "react";

import BeansIcon from "../../../../public/coffee-beans-icon.png";
import styled from "styled-components";

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
      <div className="w-full flex flex-col">
        <div className="flex justify-end">
          <VscChromeClose
            onClick={onClose}
            className="mb-4 -ml-2 cursor-pointer transistion-all hover:text-stone-500"
            size={24}
          />
        </div>
        <p className="text-4xl mb-11">LeJ’ xin chào</p>

        <Link onClick={onClose} passHref href="/products">
          <div className="flex w-full items-cente">
            <Image
              className="w-[32px] h-[32px] mr-[16px]"
              src={BeansIcon.src}
              width={32}
              height={32}
              alt="beans-icon"
            />
            <div>
              <p className="text-base">Sản phẩm</p>
              <p className="text-sm text-[#545454] font-light">
                Các loại từ LeJ`
              </p>
            </div>
            <AiOutlineRight className="w-[16px] ml-[auto] h-[16px] mr-4" />
          </div>
        </Link>

        <Divider className="bg-stone-100" />

        <Link onClick={onClose} passHref href="/about">
          <div className="flex w-full mb-5 items-center">
            <FaHandPeace className="w-[24px] h-[24px] mr-[16px]" />
            <div>
              <p className="text-base">Về chúng tôi</p>
              <p className="text-sm text-[#545454] font-light">
                Giới thiệu, dịch vụ và dự án
              </p>
            </div>
            <AiOutlineRight className="w-[16px] ml-[auto] h-[16px] mr-4" />
          </div>
        </Link>

        <Link
          onClick={onClose}
          className="-mx-10 px-10 py-3 bg-[#F8F8F8]"
          passHref
          href="/about/setup"
        >
          <div className="flex w-full items-center">
            <div className="w-[24px] h-[24px] mr-[16px]" />
            <div>
              <p className="text-base">Setup</p>
              <p className="text-sm text-[#545454] font-light">
                Tư vấn thiết kế, chiến lược kinh doanh
              </p>
            </div>
            <AiOutlineRight className="w-[16px] ml-[auto] h-[16px] mr-4" />
          </div>
        </Link>

        <Link
          onClick={onClose}
          className="-mx-10 px-10 py-3 bg-[#F8F8F8]"
          passHref
          href="/about/setup"
        >
          <div className="flex w-full items-center">
            <div className="w-[24px] h-[24px] mr-[16px]" />
            <div>
              <p className="text-base">Training</p>
              <p className="text-sm text-[#545454] font-light">
                Đào tạo, workshop
              </p>
            </div>
            <AiOutlineRight className="w-[16px] ml-[auto] h-[16px] mr-4" />
          </div>
        </Link>

        <Link
          onClick={onClose}
          className="-mx-10 px-10 py-3 bg-[#F8F8F8]"
          passHref
          href="/about/supply"
        >
          <div className="flex w-full items-center">
            <div className="w-[24px] h-[24px] mr-[16px]" />
            <div>
              <p className="text-base">Supply</p>
              <p className="text-sm text-[#545454] font-light">
                Cung cấp số lượng lớn
              </p>
            </div>
            <AiOutlineRight className="w-[16px] ml-[auto] h-[16px] mr-4" />
          </div>
        </Link>
      </div>
    </Drawer>
  );
};

export default NavigationDrawer;
