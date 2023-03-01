import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { Collapse } from "@mui/material";
import { IProduct } from "common";
import { useForm } from "react-hook-form";
import GRIND_SIZE from "../../constants/grindSize";
import BeanIcon from "../../public/coffee-beans-icon.png";
import Ratio from "../Ratio";
import format from "../../utils/format";
import useCart from "../../hooks/useCart";

type ProductInfoProps = {
  product: IProduct;
};

type ProductForm = {
  notes: string;
  shouldGrind: boolean;
  grind: GRIND_SIZE;
  quantity: number;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
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
      categories: product.categories.map(({_id}) => _id),
      price: product.warehourse.price,
      afterPrice: product.warehourse.price,
      quantity: quantity,
      slug: product.slug,
      notes,
    });

    setAdded(true);
  };

  const getButtonState = (added: boolean) => {
    const base = "transition-all flex justify-center items-center ";
    if (added)
      return base + " bg-black text-white font-medium py-2 px-4 rounded-full";
    return base + " bg-white text-black font-medium py-2 px-4 rounded-full";
  };

  return (
    <>
      <div className="flex w-full min-h-screen">
        <div className="flex-1 flex items-center justify-center bg-[#CC81AE]">
          <div
            style={{
              backgroundSize: "contain",
              background:
                "url('https://www.foodandwine.com/thmb/o7F9en0HhC601ws3gCvBz4klgSE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-store-coffee-beans-FT-BLOG0121-99af87cb1f104993b234e1522746e82c.jpg')",
            }}
            className="pt-[10px] flex justify-center items-center bg-white w-[370px] h-[370px] rounded-full"
          >
            <Image
              src={product.images[0].url}
              width={180}
              height={220}
              alt={product.images[0]._id!}
            />
            {/* <ImageGallery images={product.images} /> */}
          </div>
        </div>
        <div className="relative flex-1 flex flex-col py-[20px] justify-center px-[100px]">
          <p className="test-sm mb-1 text-[#CC81AE]">
            {product.categories[0].name}
          </p>
          <p className="mb-3 text-4xl">{product.title}</p>
          <p className="text-gray-500 mb-1">{product.description}</p>
          {/** SHOULD GRIND */}
          <p className="text-xl mb-2">Mức xay:</p>
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
                  grind === GRIND_SIZE.EXPRESSO
                    ? "border-black"
                    : "border-white"
                }`}
                onClick={updateGrindSize(GRIND_SIZE.EXPRESSO)}
              >
                Expresso
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
              className={grind === GRIND_SIZE.EXPRESSO ? "mb-5" : ""}
              in={grind === GRIND_SIZE.EXPRESSO}
            >
              <textarea
                onChange={updateNote}
                className="bg-[#efefef] min-h-[60px] appearance-none py-2 px-3 leading-tight focus:outline-none focus:shadow-outline rounded w-[50%]"
                placeholder="Bạn có thể ghi chú thêm mẫu máy"
              />
            </Collapse>
          </Collapse>

          <div className="flex justify-between w-[360px] flex-nowrap items-center mb-2">
            <p className="text-xl mr-9">Số lượng:</p>
            <Ratio
              min={1}
              max={100}
              step={1}
              value={quantity}
              increaseCb={increaseQuantity}
              decreaseCb={decreaseQuantity}
              className="w-[180px]"
            />
          </div>

          <div className="absolute text-white p-4 flex bg-black bottom-0 rounded-t-2xl left-0 right-0 w-[80%] mx-auto h-[80px]">
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
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
