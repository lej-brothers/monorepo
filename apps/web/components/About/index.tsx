import dynamic from "next/dynamic";
import React, { ReactElement } from "react";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const ScrollBar = dynamic(() => import("react-scrollbar"), { ssr: false });

import CafeIcon from "../../public/cafe-icon.png";
import CoffeeBean from "../../public/coffee-beans-icon.png";
import CoffeeMaker from "../../public/coffee-maker.png";
import CoffeeTable from "../../public/coffee-table.jpeg";

import { Carousel } from "antd";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import Layout from "../../components/Layout";

const About = () => {
  return (
    <ScrollBar
      
      className="h-[100vh]"
      contentClassName="flex justify-center"
    >
      <div className="flex items-center w-[834px] flex-col">
        <div
          style={{ background: `url(${CoffeeTable.src})` }}
          className="px-[100px] py-[60px] text-white flex flex-col justify-end items-center rounded-b-[45px] h-[587px] bg-black"
        >
          <p className="text-4xl mb-8">Về Le J’</p>
          <p className="text-base text-center">
            An easy-going coffee with a delicious, syrupy mouthfeel. Los Altos
            has been at the core of who we are for years, showcasing our long
            term Direct Trade relationship with the Mierisch family.
          </p>
        </div>

        <div className="flex mt-10 flex-col">
          <p className="text-xl mb-5">Cửa hàng</p>
          <div className="flex">
            <div className="flex-1">
              <Carousel autoplay effect="fade" className="w-[371px] h-[248px]">
                <div>
                  <Slide>
                    <h3>1</h3>
                  </Slide>
                </div>
                <div>
                  <Slide>
                    <h3>2</h3>
                  </Slide>
                </div>
                <div>
                  <Slide>
                    <h3>3</h3>
                  </Slide>
                </div>
                <div>
                  <Slide>
                    <h3>4</h3>
                  </Slide>
                </div>
              </Carousel>
            </div>
            <div className="flex-1 flex flex-col mb-10 px-3">
              <p className="mb-2 font-light text-sm text-[#757575]">
                An easy-going coffee with a delicious, syrupy mouthfeel. Los
                Altos has been at the core of who we are for years, showcasing
                our long term Direct Trade relationship with the Mierisch
                family.
              </p>
              <div className="rounded-lg flex p-3 mb-3 bg-[#F8F8F8] h-[88px]">
                <div className="flex-3 flex flex-col">
                  <p className="text-sm pb-1">Thông tin liên hệ</p>
                  <p className="text-sm font-light text-[#757575]">
                    51A Yersin, phường 10, Đà Lạt
                  </p>
                  <p className="text-sm font-light text-[#757575]">
                    SĐT: 093345678
                  </p>
                </div>
                <div className="flex-1 flex justify-end text-sm items-center">
                  <Link
                    target="#blank"
                    href="https://www.google.com/maps/place/51a+Yersin,+Ph%C6%B0%E1%BB%9Dng+10,+Th%C3%A0nh+ph%E1%BB%91+%C4%90%C3%A0+L%E1%BA%A1t,+L%C3%A2m+%C4%90%E1%BB%93ng/data=!4m2!3m1!1s0x31711318af7746ed:0x3b8db6ca0fa1d3d1?sa=X&ved=2ahUKEwimttDdvbD9AhUZG4gKHXDRBksQ8gF6BAgKEAI"
                    passHref
                  >
                    <button className="p-2 px-4 font-light bg-black rounded-full text-white">
                      Bản đồ
                    </button>
                  </Link>
                </div>
              </div>
              <div className="rounded-lg flex py-3 px-3 justify-between items-center bg-[#F8F8F8]">
                <p>Le J’ trên mạng xã hội</p>
                <div className="flex">
                  <Link href="https://facebook.com/lejcafe">
                    <FaFacebook className="text-3xl mr-4" />
                  </Link>
                  <Link href="https://facebook.com/lejcafe">
                    <RiInstagramFill className="text-4xl -m-1 mr-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex my-10 w-full flex-col">
          <p className="text-xl mb-5">Dịch vụ</p>
          <div className="flex">
            <div className="flex flex-1">
              <Link passHref href="/about/training">
                <button className=" btn mr-5 border-[1px] px-10 h-[84px] flex flex-col justify-center items-center border-black rounded">
                  <Image
                    src={CoffeeMaker.src}
                    width={32}
                    height={32}
                    alt="coffee-bean-icon"
                  />
                  <span>Training</span>
                </button>
              </Link>

              <Link passHref href="/about/setup">
                <button className=" btn mr-5 border-[1px] px-10 h-[84px] flex flex-col justify-center items-center border-black rounded">
                  <Image
                    src={CafeIcon.src}
                    width={32}
                    height={32}
                    alt="coffee-bean-icon"
                  />
                  <span>Setup</span>
                </button>
              </Link>

              <Link passHref href="/about/supply">
                <button className=" btn border-[1px] px-10 h-[84px] flex flex-col justify-center items-center border-black rounded">
                  <Image
                    src={CoffeeBean.src}
                    width={32}
                    height={32}
                    alt="coffee-bean-icon"
                  />
                  <span>Supply</span>
                </button>
              </Link>
            </div>
            <div className="flex-1 ml-3">
              <div className="rounded-lg flex p-3 mb-3 bg-[#F8F8F8] h-[88px]">
                <div className="flex-3 flex flex-col">
                  <p className="text-sm pb-1">Hồ sơ năng lực</p>
                  <p className="text-sm font-light text-[#757575]">
                    Liên hệ để lấy password
                  </p>
                  <p className="text-sm font-light text-[#757575]">
                    SĐT: 093345678
                  </p>
                </div>
                <div className="flex-1 flex justify-end text-sm items-center">
                  <Link
                    target="#blank"
                    href="https://www.google.com/maps/place/51a+Yersin,+Ph%C6%B0%E1%BB%9Dng+10,+Th%C3%A0nh+ph%E1%BB%91+%C4%90%C3%A0+L%E1%BA%A1t,+L%C3%A2m+%C4%90%E1%BB%93ng/data=!4m2!3m1!1s0x31711318af7746ed:0x3b8db6ca0fa1d3d1?sa=X&ved=2ahUKEwimttDdvbD9AhUZG4gKHXDRBksQ8gF6BAgKEAI"
                    passHref
                  >
                    <button className="p-2 px-4 font-light bg-black rounded-full text-white">
                      Xem PDF
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollBar>
  );
};

export default About;

const Slide = styled.div`
  color: white;
  width: 371px;
  display: flex;
  border-radius: 15px;
  justify-content: center;
  background: #364d79;
  align-items: center;
  height: 248px;
`;
