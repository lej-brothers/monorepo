import Image from "next/image";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

import LeJCompactLogo from "../../public/lej-compact-logo.png";
import { CartDropdown } from "./components";
// import CartDropdown from "@modules/layout/components/cart-dropdown"

const Navbar = () => {
  const { pathname } = useRouter();
  const [isHome, setIsHome] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  // return (
  //   <div
  //     className={clsx("sticky top-0 inset-x-0 z-50 group", {
  //       "!fixed": isHome,
  //     })}
  //   >
  // <header
  //   className={clsx(
  //     "relative h-16 px-8 mx-auto transition-colors bg-transparent border-b border-transparent duration-200 group-hover:bg-white group-hover:border-gray-200",
  //     {
  //       "!bg-white !border-gray-200": !isHome || isScrolled,
  //     }
  //   )}
  // >
  //       <nav
  //         className={clsx(
  //           "text-gray-900 flex items-center justify-between w-full h-full text-small-regular transition-colors duration-200",
  //           {
  //             "text-white group-hover:text-gray-900": isHome && !isScrolled,
  //           }
  //         )}
  //       >
  //         <div className="flex-1 basis-0 h-full flex items-center">
  //           <div className="block small:hidden">
  //             <Hamburger setOpen={toggle} />
  //           </div>
  //           <div className="hidden small:block h-full">
  //             <DropdownMenu />
  //           </div>
  //         </div>

  //         <div className="flex items-center h-full">
  //           <Link className="text-xl-semi uppercase" href="/">
  //             Acme
  //           </Link>
  //         </div>

  //         <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
  //           <div className="hidden small:flex items-center gap-x-6 h-full">
  //             {process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
  //             <Link href="/account">Account </Link>
  //           </div>
  //           <CartDropdown />
  //         </div>
  //       </nav>
  //       <MobileMenu />
  //     </header>
  //   </div>
  // )

  if (isMobile) {
    return <></>;
  }

  return (
    <header className="absolute inset-y-[55px] z-50 flex justify-center items-center w-full h-[122px]">
      <nav
        style={{
          background: "rgb(255,255,255,0.2)",
          boxShadow: "0px 5px 18px 2px rgb(0,0,0,0.1)",
        }}
        className="flex max-w-2xl backdrop-blur-2xl w-full h-[88px] rounded-full"
      >
        <div className="flex flex-1 justify-center items-center">
          <Image
            src={LeJCompactLogo}
            width={47}
            height={52}
            alt="lej-logo"
          />
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
              <FaShoppingCart />
            </button>
          </CartDropdown>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
