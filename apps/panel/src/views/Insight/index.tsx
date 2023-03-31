import React from "react";
import { Container } from "../Order/styles";
import { NumberBox } from "./styles";

const Insight: React.FC = () => {
  return (
    <Container className="flex flex-col">
      <div className="flex flex-nowrap gap-8">
        <NumberBox className="flex-1">
          <p className="uppercase text-base font-semibold text-white">
            Khách hàng mới
          </p>
          <p className="text-2xl font-bold text-white">21</p>
        </NumberBox>

        <NumberBox className="flex-1">
          <p className="uppercase text-base font-semibold text-white">Doanh thu</p>
          <p className="text-2xl font-bold text-white">21.000.000 VND</p>
        </NumberBox>

        <NumberBox className="flex-1">
        <p className="uppercase text-base font-semibold text-white">Sản phẩm đã bán</p>
          <p className="text-2xl font-bold text-white">210</p>
        </NumberBox>
      </div>
      <p className="mt-5">Doanh thu trong 30 ngày</p>
    </Container>
  );
};

export default Insight;
