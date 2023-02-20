import { ICart, ICartProduct } from "common";
import CartModule from "../modules/cart.module";
import { useMutation, useQuery } from "react-query";

const useCart = () => {
  const {
    data: cartData,
    refetch,
    isLoading,
  } = useQuery("cart", CartModule.get, {
    keepPreviousData: true,
    refetchOnReconnect: false,
    staleTime: 10000,
  });

  const { mutateAsync } = useMutation<ICart, unknown, ICart>(
    "update-cart",
    CartModule.update
  );

  const addProduct = async (newProduct: ICartProduct) => {
    if (!cartData) return;
    const cleanedProducts = cartData.products.filter(
      (product) => product._id !== newProduct._id
    );
    cartData.products = [...cleanedProducts, newProduct];
    await mutateAsync(cartData);
    await refetch();
  };

  const removeProduct = async (id: string) => {
    if (!cartData) return;

    const cleanedProducts = cartData.products.filter(
      (product) => product._id !== id
    );
    cartData.products = cleanedProducts;

    await mutateAsync(cartData);
    await refetch();
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (!cartData) return;

    const updatedProducts = cartData.products.map((product) => {
      if (product._id === id) product.quantity = quantity;
      return product;
    });

    await mutateAsync(cartData);
    await refetch();
  };

  return {
    open,
    isLoading,
    cart: cartData!,
    addProduct,
    removeProduct,
    updateQuantity,
  };
};

export default useCart;
