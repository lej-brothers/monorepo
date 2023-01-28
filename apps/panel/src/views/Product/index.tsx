import React, { useState } from "react";
import { Container } from "./styles";
import { Button, Table } from "antd";
import ProductCreateDrawer from "./components/CreateDrawer";
import { PRODUCT_DRAWER } from "./constants";

const Product: React.FC = () => {
  const [drawer, setDrawer] = useState(PRODUCT_DRAWER.NONE);

  const openCreateDrawer = () => setDrawer(PRODUCT_DRAWER.CREATE);
  const onCloseDrawer = () => setDrawer(PRODUCT_DRAWER.NONE);

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
        open={drawer === PRODUCT_DRAWER.CREATE}
        onClose={onCloseDrawer}
      />
    </>
  );
};

export default Product;
