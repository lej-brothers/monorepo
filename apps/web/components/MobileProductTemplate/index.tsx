import { IProduct } from "common";
import Image from "next/image";
import GRIND_SIZE from "../../constants/grindSize";
import { AiFillCheckCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import useCart from "../../hooks/useCart";
import dynamic from "next/dynamic";
import BeanIcon from "../../public/coffee-beans-icon.png";
import { CATEGORY_COLOR } from "../../constants/CATEGORY_COLOR";
import { getGrindAttitude } from "../ProductTemplate/utils";
import { Collapse } from "@mui/material";
import format from "../../utils/format";
import Ratio from "../Ratio";

const ScrollBar = dynamic(() => import("react-scrollbar"), { ssr: false });

type ProductInfoProps = {
  product: IProduct;
};

type ProductForm = {
  notes: string;
  shouldGrind: boolean;
  grind: GRIND_SIZE;
  quantity: number;
};

const MobileProductTemplate: React.FC<ProductInfoProps> = ({ product }) => {
  const methods = useForm<ProductForm>({
    defaultValues: { grind: GRIND_SIZE.NONE, quantity: 1 },
  });

  const [added, setAdded] = useState(false);
  const { quantity, shouldGrind, grind, notes } = methods.watch();
  const { addProduct } = useCart();

  // EVENT HANDLERS
  const updateShouldGrind = (shouldGrind: boolean) => () => {
    methods.setValue("shouldGrind", shouldGrind);
    setAdded(false);
  };

  const updateGrindSize = (value: any) => () => {
    methods.setValue("grind", value as GRIND_SIZE);
    setAdded(false);
  };

  const increaseQuantity = () => {
    methods.setValue("quantity", quantity + 1);
    setAdded(false);
  };

  const decreaseQuantity = () => {
    methods.setValue("quantity", quantity - 1);
    setAdded(false);
  };

  const updateNote = (event: ChangeEvent<HTMLTextAreaElement>) => {
    methods.setValue("notes", event.target.value);
  };

  const add = () => {
    addProduct({
      _id: product._id!,
      title: product.title,
      description: product.description,
      categories: product.categories.map(({ _id }) => _id),
      grind: getGrindAttitude(shouldGrind, grind),
      price: product.warehourse.price,
      afterPrice: product.warehourse.price,
      quantity: quantity,
      slug: product.slug,
      notes,
    });

    setAdded(true);
  };

  return (
    <ScrollBar smoothScrolling className="h-[100vh]">
      <div
        className="relative h-[244px]"
        style={{
          background: CATEGORY_COLOR[product.categories[0].name],
          overflow: "visible",
        }}
      >
        <div
          className="absolute -bottom-[128px] left-0 right-0 mr-[auto] ml-[auto] w-[266px] h-[266px] flex justify-center items-center rounded-full bg-black"
          style={{
            backgroundSize: "contain",
            background:
              "url('https://www.foodandwine.com/thmb/o7F9en0HhC601ws3gCvBz4klgSE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-store-coffee-beans-FT-BLOG0121-99af87cb1f104993b234e1522746e82c.jpg')",
          }}
        >
          <Image
            src={product.images[0].url}
            alt={product._id!}
            width={128}
            height={185}
          />
        </div>
      </div>

      <div className="mt-[158px] mx-[16px]">
        <p className={`text-[${CATEGORY_COLOR[product.categories[0].name]}]`}>
          {product.categories[0].name}
        </p>

        <p className="text-4xl mt-2">{product.title}</p>

        <p className="mt-2 font-thin text-[#757575]">{product.description}</p>

        <p className="text-xl mb-2 mt-4">Mức xay:</p>
        <div className="flex mb-5">
          <button
            className={`w-[142px] transition-[border] bg-[#efefef] hover:border-black border-[1px] font-medium mr-3 h-[56px] rounded-lg flex justify-center btn items-center ${
              !shouldGrind ? "border-black" : "border-white"
            }`}
            onClick={updateShouldGrind(false)}
          >
            <Image
              className="mr-2"
              src={BeanIcon.src}
              width={24}
              height={24}
              alt="beans-icon"
            />
            Nguyên Hạt
          </button>
          <button
            key={`grind-should-false`}
            className={`w-[142px] transition-[border] bg-[#efefef] hover:border-black border-[1px] font-medium mr-3 h-[56px] rounded-lg flex justify-center btn items-center ${
              shouldGrind ? "border-black" : "border-white"
            }`}
            onClick={updateShouldGrind(true)}
          >
            <Image
              className="mr-2"
              src={BeanIcon.src}
              width={24}
              height={24}
              alt="beans-icon"
            />
            Xay sẵn
          </button>
        </div>

        {/** GRIND SIZE */}
        <Collapse className={shouldGrind ? "mb-5" : ""} in={shouldGrind}>
          <p className="text-xl mb-2">Cách pha:</p>
          <div className="flex mb-2">
            <button
              className={`w-[142px] transition-[border] bg-[#efefef] hover:border-black border-[1px] font-medium mr-3 h-[56px] rounded-lg flex justify-center btn items-center ${
                grind === GRIND_SIZE.ESPRESSO ? "border-black" : "border-white"
              }`}
              onClick={updateGrindSize(GRIND_SIZE.ESPRESSO)}
            >
              Espresso
            </button>

            <button
              className={`w-[142px] font-medium h-[56px] transition-all bg-[#efefef] border-[1px] hover:border-black rounded-lg flex justify-center btn items-center ${
                grind === GRIND_SIZE.FILTER ? "border-black" : "border-white"
              }`}
              onClick={updateGrindSize(GRIND_SIZE.FILTER)}
            >
              Phin
            </button>
          </div>
          <Collapse
            className={grind === GRIND_SIZE.ESPRESSO ? "mb-5" : ""}
            in={grind === GRIND_SIZE.ESPRESSO}
          >
            <textarea
              onChange={updateNote}
              className="bg-[#efefef] mt-4 w-[77%] min-h-[60px] appearance-none py-2 px-3 leading-tight focus:outline-none focus:shadow-outline rounded"
              placeholder="Bạn có thể ghi chú thêm mẫu máy"
            />
          </Collapse>
        </Collapse>

        <div className="flex  pb-[220px] pr-[56px] justify-between w-[360px] flex-nowrap items-center mb-2">
          <p className="text-xl mr-9">Số lượng:</p>
          <Ratio
            min={1}
            max={100}
            step={1}
            value={quantity}
            increaseCb={increaseQuantity}
            decreaseCb={decreaseQuantity}
            className="w-[130px]"
          />
        </div>
      </div>

      <div className="fixed text-white p-4 flex bg-black bottom-0 rounded-t-2xl left-0 right-0 w-full mx-auto h-[80px]">
        <div className="flex-1 flex justify-center flex-col pl-10">
          <p className="font-medium mb-1">Thành tiền:</p>
          <p className="text-2xl">
            {format("vi-VN", "VND", product.warehourse.price * quantity)}
          </p>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <button
            onClick={add}
            className={getButtonState(added)}
            disabled={added}
          >
            {added ? "Đã thêm vào giỏ hàng" : "Thêm vào giỏ hàng"}
            {added && <AiFillCheckCircle className="ml-1 mt-1" />}
          </button>
        </div>
      </div>
    </ScrollBar>
  );
};

export default MobileProductTemplate;

const getButtonState = (added: boolean) => {
  const base = "transition-all flex justify-center items-center ";
  if (added)
    return base + " bg-black text-white font-medium py-2 px-4 rounded-full";
  return base + " bg-white text-black font-medium py-2 px-4 rounded-full";
};
