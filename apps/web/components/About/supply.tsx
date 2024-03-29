import { Carousel } from "antd";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import styled from "styled-components";
import CoffeeMaker from "../../public/coffee-maker.png";
import CoffeeBean from "../../public/coffee-beans-icon.png";
import CafeIcon from "../../public/cafe-icon.png";

const ScrollBar = dynamic(() => import("react-scrollbar"), { ssr: false });

const Setup = () => {
  return (
    <ScrollBar
      
      className="flex flex-col items-center max-h-full w-full"
      contentClassName="pb-[250px]"
    >
      <div className="flex w-[834px] flex-col">
        <div className="px-[100px] mt-[100px] py-[60px] flex flex-col justify-end items-center rounded-b-[45px] h-[587px">
          <p className="text-4xl mb-8">Supply</p>
          <p className="text-base text-center">
            An easy-going coffee with a delicious, syrupy mouthfeel. Los Altos
            has been at the core of who we are for years, showcasing our long
            term Direct Trade relationship with the Mierisch family.
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-3xl mb-8">Các dự án:</p>

          <Carousel autoplay effect="fade" className="w-full h-[432px]">
            <div>
              <Slide
                style={{
                  background: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/310102279_113870214828105_6118577169629381649_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=tyXtXWvwJeIAX_Fre6I&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfD7UaPJBk2X4MsRJ93WlW7yd_ERFqCaxs2W5B3miVFRgw&oe=6409DE09)`,
                }}
                className="flex flex-col px-11 items-start justify-end py-11"
              >
                <h3 className="text-xl mb-3">LÃM - A place to be by HaiChau</h3>
                <p className="text-base">
                  Ẩn mình trong một ngôi nhà cổ hơn 100 tuổi mang dáng hình của
                  thời gian, Lãm khoác lên mình màu men xanh cùng những kiến
                  trúc đương đại được kết hợp tinh tế trong từng chi tiết. Những
                  ô cửa sổ vòm, những mảng tường thô vẫn còn vẻ đẹp hoài cổ,
                  những nét chấm phá của kiến trúc nghệ thuật xen lẫn nét cổ
                  kính giữa lòng Hà Nội.
                </p>
              </Slide>
            </div>
          </Carousel>
        </div>

        <div className="flex my-10 flex-col">
          <p className="text-xl mb-5">Dịch vụ</p>
          <div className="flex">
            <div className="flex flex-1">
              <Link href="/about/setup" passHref>
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

              <Link href={"/about/training"} passHref>
                <button className=" btn border-[1px] px-10 h-[84px] flex flex-col justify-center items-center border-black rounded">
                  <Image
                    src={CoffeeBean.src}
                    width={32}
                    height={32}
                    alt="coffee-bean-icon"
                  />
                  <span>Training</span>
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

export default Setup;

const Slide = styled.div`
  color: white;
  width: 100%;
  border-radius: 15px;
  background: #364d79;
  height: 432px;
`;
