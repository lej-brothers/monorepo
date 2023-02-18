import { IStore } from "./../types/IStore";
import { IOrder, IOrderProduct } from "common";
import OrderModule from "../modules/order.module";
import { useMutation, useQuery } from "react-query";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleOrderDrawer } from "../reducers/order/actions";

const useOrder = () => {
  const { data, refetch, isLoading } = useQuery("order", OrderModule.get, {
    keepPreviousData: true,
    refetchOnReconnect: false,
  });

  const orderData = data!;

  const { mutateAsync } = useMutation<IOrder, unknown, IOrder>(
    "update-order",
    OrderModule.update
  );

  const addProduct = async (newProduct: IOrderProduct) => {
    const cleanedProducts = orderData.products.filter(
      (product) => product._id !== newProduct._id
    );
    orderData.products = [...cleanedProducts, newProduct];
    await mutateAsync(orderData);
    await refetch();
  };

  const removeProduct = async (id: string) => {
    const cleanedProducts = orderData.products.filter(
      (product) => product._id !== id
    );
    orderData.products = cleanedProducts;

    await mutateAsync(orderData);
    await refetch();
  };

  return {
    open,
    isLoading,
    order: orderData,
    addProduct,
    removeProduct,
  };
};

export default useOrder;
