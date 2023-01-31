import React, { Suspense, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Container } from "./styles";
import { Button, Table } from "antd";
import { PRODUCT_DRAWER, PRODUCT_MODAL } from "./constants";

import ProductCreateDrawer from "./components/CreateDrawer";
import CategoryCreateModal from "./components/CategoryCreateModal";
import ProductModule from "../../modules/product";
import { IProduct, IProductCreate } from "common";
import useProducts from "../../utils/useProducts";

const Product: React.FC = () => {
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(PRODUCT_MODAL.NONE);
  const [drawer, setDrawer] = useState(PRODUCT_DRAWER.NONE);
  const { data } = useProducts();

  const createMutation = useMutation<IProduct, unknown, IProductCreate>(
    "create-product",
    ProductModule.create
  );

  const products = data?.docs || [];

  const openCreateDrawer = () => setDrawer(PRODUCT_DRAWER.CREATE);

  const onCloseDrawer = () => setDrawer(PRODUCT_DRAWER.NONE);
  const onCloseModal = () => setModal(PRODUCT_MODAL.NONE);

  const onCreateProduct = async (payload: IProductCreate) => {
    await createMutation.mutateAsync(payload);
    await queryClient.refetchQueries(["categories"], { active: true });
    onCloseDrawer();
  };

  console.log(products);

  const toggleModal = (modal: PRODUCT_MODAL) => setModal(modal);

  return (
    <>
      <Suspense fallback={<>Loading..</>}>
        <Container>
          <div className="flex justify-end mb-2">
            <Button onClick={openCreateDrawer} size="large">
              +
            </Button>
          </div>
          <Table />
        </Container>

        <ProductCreateDrawer
          toggleModal={toggleModal}
          onSubmit={onCreateProduct}
          open={drawer === PRODUCT_DRAWER.CREATE}
          onClose={onCloseDrawer}
        />

        <CategoryCreateModal
          open={modal === PRODUCT_MODAL.CATEGORY_CREATE}
          onClose={onCloseModal}
        />
      </Suspense>
    </>
  );
};

export default Product;
