import { IOrderProduct } from "common";
import useProduct from "../../../hooks/useProduct";
import Product from "../../Product";
import format from "../../../utils/format";
import Ratio from "../../Ratio";

interface Props {
  product: IOrderProduct;
}

const OrderProduct = ({ product }: Props) => {
  const { data, isLoading } = useProduct(product.slug);

  if (isLoading) return <></>;

  const price = format("vi-VN", "VND", product.price * product.quantity);

  return (
    <Product price={`${price} VND`} product={data!}>
      <Ratio
        min={100}
        max={1000}
        step={100}
        value={product.quantity}
        format={(value) => `${value}`}
        onChange={(num) => {}}
        className="w-[180px] mt-8"
      />{" "}
    </Product>
  );
};

export default OrderProduct;
