import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from "react-redux";
import useCart from "../../hooks/useCart";
import { MOBILE_NAVBAR_DRAWER } from "./constants";
import NavigationDrawer from "./components/NavigationDrawer";
import { toggleCartDrawer } from "../../reducers/cart/actions";
import { toggleSearchDrawer } from "../../reducers/search/actions";
import { Badge } from "antd";

export interface Props {
  color?: string;
}

const MobileNavbar = ({ color = "black" }: Props) => {
  const dispatch = useDispatch();
  const { pathname } = useRouter();

  const { cart } = useCart();
  const [drawer, setDrawer] = useState(MOBILE_NAVBAR_DRAWER.NONE);
  const [isScrolled, setIsScrolled] = useState(false);

  const totalCount = cart?.products.length || 0;

  /**
   * EVENT HANDLERS
   */

  const openNavigationDrawer = () => setDrawer(MOBILE_NAVBAR_DRAWER.NAVIGATION);

  const onClose = () => setDrawer(MOBILE_NAVBAR_DRAWER.NONE);

  const toggleCart = () => {
    dispatch(toggleCartDrawer());
  };

  const toggleSearch = () => {
    dispatch(toggleSearchDrawer());
  };

  /**
   * SIDE-EFFECTS
   */

  useEffect(() => {
    const detectScrollY = () => {
      console.log(window.scrollY);
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
  }, []);

  /**
   * MAIN RETURN
   */

  return (
    <header className="fixed select-none z-50 flex justify-center items-center w-full h-[55px]">
      <nav
        className={`flex max-w-2xl w-[100vw]  bg-white text-${color} h-[55px]`}
      >
        <div className="w-full flex justify-between items-center px-5">
          <GiHamburgerMenu
            className="cursor-pointer transition-all"
            onClick={openNavigationDrawer}
            size={32}
          />
          <div className="flex">
            <AiOutlineSearch
              className="cursor-pointer "
              onClick={toggleSearch}
              size={32}
            />
            <Badge size="small" count={totalCount || 0}>
              <AiOutlineShoppingCart
                className="cursor-pointer ml-6 "
                onClick={toggleCart}
                size={32}
              />
            </Badge>
          </div>
        </div>
      </nav>

      <NavigationDrawer
        open={drawer === MOBILE_NAVBAR_DRAWER.NAVIGATION}
        onClose={onClose}
      />
    </header>
  );
};

export default MobileNavbar;
