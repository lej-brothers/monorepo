"use client";

import { Badge } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

import Link from "next/link";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useCart from "../../hooks/useCart";
import LeJCompactLogo from "../../public/lej-compact-logo.png";
import { toggleCartDrawer } from "../../reducers/cart/actions";
import { toggleSearchDrawer } from "../../reducers/search/actions";

const Navbar = () => {
  const dispatch = useDispatch();
  const { pathname } = useRouter();
  const [isHome, setIsHome] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart();

  const toggleCart = () => {
    dispatch(toggleCartDrawer());
  };

  const toggleSearch = () => {
    dispatch(toggleSearchDrawer());
  };

  const products = cart?.products || [];

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

  return (
    <header className="fixed z-50 flex justify-center items-center w-full h-[122px]">
      <nav
        style={{
          background: "rgb(255,255,255,0.2)",
          boxShadow: "0px 5px 18px 2px rgb(0,0,0,0.1)",
        }}
        className="flex max-w-2xl backdrop-blur-2xl w-[100vw] h-[77px] rounded-full"
      >
        <div className="flex flex-1 justify-center items-center">
          <Link href="/">
            <Image src={LeJCompactLogo} width={39} height={42} alt="lej-logo" />
          </Link>
        </div>
        <div className="flex justify-start space-x-5 items-center flex-[4]">
          <Link href="/products">
            <Button
              active={pathname.includes("/products")}
              className="btn px-8 bg-white rounded-full h-[54px] flex justify-center items-center"
            >
              Sản phẩm
            </Button>
          </Link>
          <Link href="/about">
            <Button
              active={pathname.includes("/about")}
              className="btn px-8 bg-white rounded-full h-[54px] flex justify-center items-center"
            >
              Về chúng tôi
            </Button>
          </Link>
          <Button
            onClick={toggleSearch}
            className="btn bg-white rounded-full h-[54px] w-[54px] flex justify-center items-center"
          >
            <FaSearch size={20} />
          </Button>
          <Button
            onClick={toggleCart}
            className="btn bg-white rounded-full h-[54px] w-[54px] flex justify-center items-center"
          >
            <Badge size="small" count={products.length || 0}>
              <FaShoppingCart size={20} />
            </Badge>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

const Button = styled.button<{ active?: boolean }>`
  transition: 250ms all;
  background: ${(props) => (props.active ? "black" : "white")};
  color: ${(props) => (props.active ? "#ffffff" : "black")};
`;
