/* eslint-disable @next/next/no-img-element */
import CoffeeAnimated from "../../public/coffee-cup-animated.gif";

const Loading = () => {
  return (
    <div className="fixed z-[51] pb-[60px] w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-black">
      <img
        className="lg:w-[400px] lg:h-[400px] md:w-[300px] md:h-[300px] sm:w-[200px] sm:h-[200px]"
        src={CoffeeAnimated.src}
        alt="loading"
      />
    </div>
  );
};

export default Loading;
