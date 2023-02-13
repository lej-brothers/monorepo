import { IProduct } from "common";
import Image from "next/image";
import Link from "next/link";
import format from "../../utils/format";

interface Props {
  className?: string;
  product: IProduct;
  price?: string;
}

const Product = ({ className = "", product, price }: Props) => {

  const formatedPrice = format('vi-VN', 'VND', (price || product.warehourse.price) as number)

  return (
    <Link href={`/products/${product.slug}`} passHref>
      <div
        className={`bg-stone-100 break-normal cursor-pointer select-none items-center w-full h-[130px] rounded flex justify-center ${className}`}
      >
        <div className="flex-1 h-full relative">
          <Image
            className="absolute -top-8 left-0"
            src={product.images[0].url!}
            alt={product.title}
            width={122}
            height={166}
          />
        </div>

        <div className="flex-1 flex flex-col -translate-x-8">
          <h3 className="font-medium mb-2 text-base">{product.title}</h3>
          <p className="text-base text-gray-500">
            {product.isMetch ? `${formatedPrice} VND` : `${formatedPrice} VND / 100g` }
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Product;
