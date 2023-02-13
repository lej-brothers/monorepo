import Image from "next/image";
import { isMobile } from "react-device-detect";
import { Badge } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

import LeJCompactLogo from "../../public/lej-compact-logo.png";
import { CartDropdown } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../reducers/order/actions";
import { IStore } from "../../types/IStore";
// import CartDropdown from "@modules/layout/components/cart-dropdown"

const Navbar = () => {
  const dispatch = useDispatch();
  const { pathname } = useRouter();
  const [isHome, setIsHome] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const order = useSelector((state: IStore) => state.order);

  //useEffect that detects if window is scrolled > 5px on the Y axis
  useEffect(() => {
    if (isHome) {
      const detectScrollY = () => {
        if (window.scrollY > 5) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      window.addEventListener("scroll", detectScrollY);

      return () => {
        window.removeEventListener("scroll", detectScrollY);
      };
    }
  }, [isHome]);

  useEffect(() => {
    pathname === "/" ? setIsHome(true) : setIsHome(false);
  }, [pathname]);

  useEffect(() => {
    dispatch(getOrder());
  }, []);

  if (isMobile) {
    return <></>;
  }

  return (
    <header className={`absolute ${isScrolled ? 'inset-y-[25px]': 'inset-y-[35px]'}  z-50 flex justify-center items-center w-full h-[122px]`}>
      <nav
        style={{
          background: "rgb(255,255,255,0.2)",
          boxShadow: "0px 5px 18px 2px rgb(0,0,0,0.1)",
        }}
        className="flex max-w-2xl backdrop-blur-2xl w-full h-[88px] rounded-full"
      >
        <div className="flex flex-1 justify-center items-center">
          <Image src={LeJCompactLogo} width={47} height={52} alt="lej-logo" />
        </div>
        <div className="flex justify-start space-x-5 items-center flex-[4]">
          <button className="btn px-8 bg-white rounded-full h-[54px] flex justify-center items-center">
            Sản phẩm
          </button>
          <button className="btn px-8 bg-white rounded-full h-[54px] flex justify-center items-center">
            Về chúng tôi
          </button>
          <button className="btn bg-white rounded-full h-[54px] w-[54px] flex justify-center items-center">
            <FaSearch />
          </button>
          <CartDropdown>
            <button className="btn bg-white rounded-full h-[54px] w-[54px] flex justify-center items-center">
              <Badge size="small" count={order?.products?.length || 0}>
                <FaShoppingCart />
              </Badge>
            </button>
          </CartDropdown>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
