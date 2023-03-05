import { Button, Input } from "antd";
import dynamic from "next/dynamic";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { toggleSearchDrawer } from "../../reducers/search/actions";
import useProducts from "../../hooks/useProducts";
import Product from "../Product";
import { useDebounce } from "usehooks-ts";

const ScrollBar = dynamic(() => import("react-scrollbar"), { ssr: false });

const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { data } = useProducts(
    1,
    20,
    { title: debouncedSearch },
    { enabled: !!debouncedSearch.length }
  );

  const products = data?.docs || [];

  const toggle = () => dispatch(toggleSearchDrawer());

  return (
    <ScrollBar smoothScrolling className="max-h-full">
      <div className="flex flex-col">
        <div className="flex justify-end mt-[46px] mr-[46px]">
          <Button onClick={toggle} type="text">
            <AiOutlineClose size={18} />
          </Button>
        </div>

        <p className="px-[96px] font-semibold text-3xl mt-5">Tìm kiếm</p>

        <div className="px-[96px] flex mt-5">
          <Input
            className="h-[49px] mb-11"
            prefix={<RiSearchLine />}
            placeholder="Bạn cần tìm cà phê gì?"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {products.map((product) => (
          <div onClick={toggle} key={product._id} className="my-10 mx-[96px]">
            <Product product={product} />
          </div>
        ))}

        {!products.length && (
          <p className="text-xl select-none mx-[96px] text-gray-300 mt-5">
            Không có thông tin để hiển thị.
          </p>
        )}
      </div>
    </ScrollBar>
  );
};

export default Search;
