import {
  Button,
  Pagination,
  PaginationProps,
  Table,
  TablePaginationConfig,
  Tag,
} from "antd";
import React, { Suspense, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { PRODUCT_DRAWER, PRODUCT_MODAL } from "./constants";
import { Container } from "./styles";
import { ICategory, IProduct, IProductCreate } from "common";
import { FormattedMessage } from "react-intl";
import ProductModule from "../../modules/product";
import useProducts from "../../utils/useProducts";
import CategoryCreateModal from "./components/CategoryCreateModal";
import ProductCreateDrawer from "./components/CreateDrawer";

const { Column } = Table;

const Product: React.FC = () => {
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(PRODUCT_MODAL.NONE);
  const [drawer, setDrawer] = useState(PRODUCT_DRAWER.NONE);

  const [{ page, limit }, setPaginate] = useState({ page: 1, limit: 20 });

  const { data } = useProducts(page, limit);

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
        <Table pagination={false} dataSource={products}>
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
            render={(price: number) => price.toLocaleString("en-US")}
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
        toggleModal={toggleModal}
        onSubmit={onCreateProduct}
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
