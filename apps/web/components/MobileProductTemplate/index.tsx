import { IProduct } from "common";
import GRIND_SIZE from "../../constants/grindSize";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useCart from "../../hooks/useCart";
import dynamic from "next/dynamic";

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

  return (
    <div className="relative max-h-[100vh]">
      <ScrollBar
        smoothScrolling
        className="px-[74px] h-[calc(100vh_-_130px)]"
      ></ScrollBar>
    </div>
  );
};

export default MobileProductTemplate;
