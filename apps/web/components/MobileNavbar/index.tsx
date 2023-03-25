import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from "react-redux";
import useCart from "../../hooks/useCart";
import { MOBILE_NAVBAR_DRAWER } from "./constants";
import NavigationDrawer from "./components/NavigationDrawer";
import { toggleCartDrawer } from "../../reducers/cart/actions";
import { toggleSearchDrawer } from "../../reducers/search/actions";

const MobileNavbar = () => {
  const dispatch = useDispatch();
  const { pathname } = useRouter();

  const [isHome, setIsHome] = useState(false);
  const [drawer, setDrawer] = useState(MOBILE_NAVBAR_DRAWER.NAVIGATION); // TO-DO: Remove when done dev
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart();

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

  /**
   * MAIN RETURN
   */

  return (
    <header className="fixed z-50 flex justify-center items-center w-full h-[77px]">
      <nav
        className={`flex max-w-2xl w-[100vw]  ${
          isHome ? "bg-transparent" : "bg-white"
        } text-black hover:text-gray-500 h-[77px]`}
      >
        <div className="w-full flex justify-between items-center px-5">
          <GiHamburgerMenu
            className="cursor-pointer transition-all"
            onClick={openNavigationDrawer}
            size={32}
          />
          <div className="flex">
            <AiOutlineSearch className="cursor-pointer hover:text-stone-500" onClick={toggleSearch} size={32} />
            <AiOutlineShoppingCart className="cursor-pointer ml-6 hover:text-stone-500" onClick={toggleCart} size={32} />
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
