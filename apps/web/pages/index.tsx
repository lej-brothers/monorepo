import Navbar from "../components/Navbar";
import CoffeeTop from "../public/coffee-top.png";
import ProductRotator from "../components/ProductRotator";
import useProducts from "../hooks/useProducts";
import Collection from "../components/Collection";
import FeaturedProducts from "../components/FeaturedProducts";

export default function Web() {
  const products = useProducts();

  const first3 = products.data?.docs?.slice(0, 3);
  console.log(first3);

  return (
    <div>
      <Navbar />
      <section
        style={{
          backgroundRepeat: "no-repeat",
          background: `url(${CoffeeTop.src})`,
          backgroundSize: "cover",
        }}
        className="flex justify-center items-end h-[100vh] w-full"
      >
        <div className="flex mt-[0px] flex-col justify-center items-center bg-white w-full max-w-3xl h-[60%] rounded-tl-full rounded-tr-full relative">
          {first3 && <ProductRotator products={first3 as any} />}
        </div>
      </section>

      <section className="flex justify-center bg-black">
        <div className="flex flex-col justify-center items-center bg-white w-full max-w-3xl h-[100%] py-12">
          <FeaturedProducts />
        </div>
      </section>
      
      <section className="flex justify-center bg-black">
        <div className="flex flex-col justify-center items-center bg-white w-full max-w-3xl h-[100%] py-12">
          <Collection />
        </div>
      </section>
    </div>
  );
}
