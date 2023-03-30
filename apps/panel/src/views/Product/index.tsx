import { Button, Pagination, PaginationProps, Table, Tag, Tooltip } from "antd";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { PRODUCT_DRAWER, PRODUCT_MODAL } from "./constants";
import { Container } from "./styles";
import { ICategory, IProductCreate } from "common";
import { BsStar, BsStarFill } from "react-icons/bs";
import { FormattedMessage } from "react-intl";
import CategoryCreateModal from "./components/CategoryCreateModal";
import ProductCreateDrawer from "./components/CreateDrawer";
import { ProductQuery } from "queries";
import format from "../../utils/format";

const { Column } = Table;

const Product: React.FC = () => {
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(PRODUCT_MODAL.NONE);
  const [drawer, setDrawer] = useState(PRODUCT_DRAWER.NONE);
  const [editing, setEditing] = useState<string | undefined>(undefined);

  const [{ page, limit }, setPaginate] = useState({ page: 1, limit: 20 });

  const { data, refetch } = ProductQuery.useList(page, limit, {});

  const createMutation = ProductQuery.useCreateProduct();
  const editMutation = ProductQuery.useUpdateProduct();

  const products = data?.docs || [];

  const openCreateDrawer = () => setDrawer(PRODUCT_DRAWER.CREATE);

  const onCloseDrawer = () => {
    setDrawer(PRODUCT_DRAWER.NONE);
    setEditing(undefined);
  };
  const onCloseModal = () => {
    setModal(PRODUCT_MODAL.NONE);
  };

  const onCreateProduct = async (payload: IProductCreate) => {
    await createMutation.mutateAsync(payload);
    await queryClient.refetchQueries(["categories"], { active: true });
  };

  const onUpdateProduct = async (payload: IProductCreate) => {
    await editMutation.mutateAsync(payload);
    await queryClient.refetchQueries(["categories", "products"], {
      active: true,
    });
    await refetch();
  };

  const onSubmit = async (payload: IProductCreate) => {
    if (editing) await onUpdateProduct(payload);
    else await onCreateProduct(payload);

    onCloseDrawer();
  };

  const onChange: PaginationProps["onChange"] = (page, limit) => {
    setPaginate({ page, limit });
  };

  const toggleModal = (modal: PRODUCT_MODAL) => setModal(modal);

  return (
    <>
      <Container>
        <div className="flex justify-end mb-2">
          <Button onClick={openCreateDrawer} size="large">
            +
          </Button>
        </div>
        <Table
          onRow={(data) => ({
            className: "cursor-pointer",
            onClick: (event) => {
              event.stopPropagation();
              setEditing(data.slug);
              setDrawer(PRODUCT_DRAWER.CREATE);
            },
          })}
          pagination={false}
          dataSource={products}
        >
          <Column
            title={<FormattedMessage id="product.create.name" />}
            dataIndex="title"
          />
          <Column
            title={<FormattedMessage id="product.create.category" />}
            dataIndex="categories"
            render={(categories: ICategory[]) => {
              return (
                <>
                  {categories.map((category) => (
                    <Tag color="blue" key={category._id}>
                      {category.name}
                    </Tag>
                  ))}
                </>
              );
            }}
          />
          <Column
            title={<FormattedMessage id="count" />}
            dataIndex={["warehourse", "count"]}
            render={(count: number) => count.toLocaleString("en-US")}
          />
          <Column
            title={<FormattedMessage id="product.create.metch_price" />}
            dataIndex={["warehourse", "price"]}
            render={(price: number) => format("vi-VN", "VND", price)}
          />
          <Column
            dataIndex={["isHighlight"]}
            onCell={(data: any) => ({
              onClick: (e) => {
                e.stopPropagation();
                onUpdateProduct({ ...data, isHighlight: !data.isHighlight });
              },
            })}
            render={(value) => (
              <Tooltip title={<FormattedMessage id="tutorial.highlight" />}>
                {value ? <BsStarFill size={20} /> : <BsStar size={20} />}
              </Tooltip>
            )}
          />
        </Table>
        <div className="mt-2 flex justify-end">
          <Pagination
            current={page}
            pageSize={limit}
            onChange={onChange}
            pageSizeOptions={[10, 20, 30]}
            defaultPageSize={20}
            defaultCurrent={1}
            total={data?.totalDocs || 0}
            showTotal={(showing) => (
              <div className="h-full flex items-center mt-1">
                <FormattedMessage
                  id="paginate.text"
                  values={{ showing, total: data?.totalDocs || 0 }}
                />
              </div>
            )}
            responsive
          />
        </div>
      </Container>

      <ProductCreateDrawer
        editing={editing}
        toggleModal={toggleModal}
        onSubmit={onSubmit}
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
