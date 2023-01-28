import React, { useState } from "react";
import { Container } from "./styles";
import { Button, Table } from "antd";
import { PRODUCT_DRAWER, PRODUCT_MODAL } from "./constants";

import ProductCreateDrawer from "./components/CreateDrawer";
import CategoryCreateModal from "./components/CategoryCreateModal";

const Product: React.FC = () => {
  const [modal, setModal] = useState(PRODUCT_MODAL.NONE);
  const [drawer, setDrawer] = useState(PRODUCT_DRAWER.NONE);

  const openCreateDrawer = () => setDrawer(PRODUCT_DRAWER.CREATE);

  const onCloseDrawer = () => setDrawer(PRODUCT_DRAWER.NONE);
  const onCloseModal = () => setModal(PRODUCT_MODAL.NONE);

  const toggleModal = (modal: PRODUCT_MODAL) => setModal(modal);

  return (
    <>
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
        open={drawer === PRODUCT_DRAWER.CREATE}
        onClose={onCloseDrawer}
      />

      <CategoryCreateModal
        open={modal === PRODUCT_MODAL.CATEGORY_CREATE}
        onClose={onCloseModal}
      />
    </>
  );
};

export default Product;
