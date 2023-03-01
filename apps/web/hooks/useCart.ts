import { ICart, ICartCreate, ICartProduct } from "common";
import CartModule from "../modules/cart.module";
import { useMutation, useQuery } from "react-query";
import { useMemo } from "react";
import format from "../utils/format";

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

  const totalAmount = useMemo(() => {
    const product = cartData?.products || [];
    return product.reduce((pre, cur) => {
      return pre + cur.afterPrice * cur.quantity;
    }, 0);
  }, [cartData]);

  const formattedTotalAmount = format("vi-VN", "VND", totalAmount);

  const { mutateAsync } = useMutation<ICart, unknown, ICartCreate>(
    "update-cart",
    CartModule.update
  );

  const addProduct = async (newProduct: ICartProduct) => {
    if (!cartData) return;

    const cleanedProducts = cartData.products.filter(
      (product) => product._id !== newProduct._id
    );

    const promotionCodes = cartData.promotions.map(
      (promotion) => promotion.code
    );

    const payload: ICartCreate = {
      _id: cartData._id,
      sessionId: cartData.sessionId,
      products: [...cleanedProducts, newProduct],
      promotions: promotionCodes,
    };

    await mutateAsync(payload);
    await refetch();
  };

  const removeProduct = async (id: string) => {
    if (!cartData) return;

    const cleanedProducts = cartData.products.filter(
      (product) => product._id !== id
    );
    const promotionCodes = cartData.promotions.map(
      (promotion) => promotion.code
    );

    const payload: ICartCreate = {
      _id: cartData._id,
      sessionId: cartData.sessionId,
      products: cleanedProducts,
      promotions: promotionCodes,
    };

    await mutateAsync(payload);
    await refetch();
  };

  const addPromotion = async (code: string) => {
    if (!cartData) return;

    const promotionCodes = cartData.promotions.map(
      (promotion) => promotion.code
    );

    const payload: ICartCreate = {
      _id: cartData._id,
      sessionId: cartData.sessionId,
      products: cartData.products,
      promotions: [...promotionCodes, code],
    };

    await mutateAsync(payload);
    await refetch();
  };

  const removePromotion = async (code: string) => {
    if (!cartData) return;

    const promotions = cartData.promotions.filter(
      (promotion) => promotion.code !== code
    );

    const promotionCodes = promotions.map((promotion) => promotion.code);

    const payload: ICartCreate = {
      _id: cartData._id,
      sessionId: cartData.sessionId,
      products: cartData.products,
      promotions: [...promotionCodes],
    };

    await mutateAsync(payload);
    await refetch();
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (!cartData) return;

    const updatedProducts = cartData.products.map((product) => {
      if (product._id === id) product.quantity = quantity;
      return product;
    });
    const promotionCodes = cartData.promotions.map(
      (promotion) => promotion.code
    );

    const payload: ICartCreate = {
      _id: cartData._id,
      sessionId: cartData.sessionId,
      products: updatedProducts,
      promotions: promotionCodes,
    };

    await mutateAsync(payload);
    await refetch();
  };

  return {
    open: !!open,
    isLoading,
    totalAmount,
    formattedTotalAmount,
    cart: cartData!,
    addProduct,
    removeProduct,
    updateQuantity,
    removePromotion,
    addPromotion,
  };
};

export default useCart;
