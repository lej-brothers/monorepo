import React from "react";
import { Container } from "./styles";
import { Button, Table } from "antd";

const Product: React.FC = () => {
  return (
    <Container>
      <div className="flex justify-end">
        <Button size="large">+</Button>
      </div>
      <Table />
    </Container>
  );
};

export default Product;
