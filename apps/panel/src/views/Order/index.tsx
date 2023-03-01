import { Pagination, PaginationProps, Select, Table, Tag } from "antd";
import { IOrder, ORDER_STATUS } from "common";
import { OrderQuery } from "queries";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { STATUS_OPTIONS } from "./constants";
import { Container } from "./styles";

const { Column } = Table;

const Order: React.FC = () => {
  const [{ page, limit }, setPaginate] = useState({ page: 1, limit: 20 });

  const { data, refetch } = OrderQuery.useList(page, limit, {});
  const { mutateAsync } = OrderQuery.useUpdateOrder();

  const orders = data?.docs || [];

  const onChange: PaginationProps["onChange"] = (page, limit) => {
    setPaginate({ page, limit });
  };

  return (
    <Container>
      <Table pagination={false} dataSource={orders}>
        <Column title={<FormattedMessage id="order.code" />} dataIndex="code" />
        <Column
          title={<FormattedMessage id="order.status" />}
          dataIndex="status"
          render={(value, record) => {
            const status = value as ORDER_STATUS;
            const order = record as IOrder;

            const onChangeStatus = async (value: ORDER_STATUS) => {
              await mutateAsync({ ...order, status: value });
              refetch();
            };

            return (
              <Select
                value={status}
                className="w-[150px]"
                options={STATUS_OPTIONS}
                onChange={onChangeStatus}
              />
            );
          }}
        />
        <Column
          title={<FormattedMessage id="order.transaction" />}
          dataIndex="method"
          render={(value, record) => {
            const method = value as string;
            const order = record as IOrder;

            const getText = () => {
              if (!order.isPaid) return "order.status.not_paid";

              switch (method) {
                case "MOMO":
                  return "order.status.paid.momo";
                case "BANKING":
                  return "order.status.paid.bank";
              }
            };

            return (
              <Tag color={order.isPaid ? "green" : "red"}>
                <FormattedMessage id={getText()} />
              </Tag>
            );
          }}
        />
        <Column
          title={<FormattedMessage id="order.totalAmount" />}
          dataIndex="totalAmount"
          render={(value) => {
            return <p>{value}</p>;
          }}
        />
      </Table>
      <Pagination
        current={page}
        pageSize={limit}
        onChange={onChange}
      ></Pagination>
    </Container>
  );
};

export default Order;
