import { Pagination, PaginationProps, Select, Table, Tag } from "antd";
import { IOrder, ORDER_STATUS } from "common";
import { OrderQuery } from "queries";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { ORDER_MODAL, STATUS_OPTIONS } from "./constants";
import { Container } from "./styles";
import ProductPreview from "../../components/ProductPreview";
import format from "../../utils/format";

const { Column } = Table;

const Order: React.FC = () => {
  const [{ page, limit }, setPaginate] = useState({ page: 1, limit: 20 });

  const [modal, setModal] = useState<ORDER_MODAL>(ORDER_MODAL.NONE);
  const [selected, setSelected] = useState<string>(undefined!);
  const { data, refetch } = OrderQuery.useList(page, limit, {});
  const { mutateAsync } = OrderQuery.useUpdateOrder();

  const orders = data?.docs || [];

  const onChange: PaginationProps["onChange"] = (page, limit) => {
    setPaginate({ page, limit });
  };

  const onClose = () => setModal(ORDER_MODAL.NONE);

  return (
    <Container>
      <Table
        onRow={(data) => ({
          className: 'cursor-pointer',
          onClick: (e: any) => {
            e.stopPropagation();
            setModal(ORDER_MODAL.PRODUCT_PREVIEW);
            setSelected(data._id!);
          },
        })}
        pagination={false}
        dataSource={orders}
      >
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
                onClick={(e) => e.stopPropagation()}
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
            return <p>{format('vi-VN', 'VND', value)}</p>;
          }}
        />
      </Table>
      <Pagination
            current={page}
            pageSize={limit}
            onChange={onChange}
            className="w-full mt-2 flex justify-end"
            pageSizeOptions={[10, 20, 30]}
            defaultPageSize={20}
            defaultCurrent={1}
            total={data?.totalDocs || 0}
            showTotal={(showing) => (
              <div className="h-full w-full flex items-center mt-1">
                <FormattedMessage
                  id="paginate.text"
                  values={{ showing, total: data?.totalDocs || 0 }}
                />
              </div>
            )}
            responsive
          />
      <ProductPreview
        orderId={selected}
        open={modal === ORDER_MODAL.PRODUCT_PREVIEW}
        onClose={onClose}
      />
    </Container>
  );
};

export default Order;
