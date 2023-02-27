import { Button, Pagination, PaginationProps, Table } from "antd";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Container } from "./styles";
import { useQueryClient } from "react-query";
import { PROMOTION_MODAL } from "./constants";
import { CreateModal } from "./components";
import { IPromotion, IPromotionCreate } from "common";
import CategoryCreateModal from "../Product/components/CategoryCreateModal";
import { PromotionQuery } from "queries";

const { Column } = Table;

const Promotions: React.FC = () => {
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(PROMOTION_MODAL.NONE);
  const [{ page, limit }, setPaginate] = useState({ page: 1, limit: 20 });

  const { data } = PromotionQuery.useList(page, limit);

  const createMutation = PromotionQuery.useCreate();

  /**
   * MAPPED VALUES
   */
  const promotions = data?.docs || [];

  /**
   * EVENT HANDLER
   */
  const openCreateModal = () => setModal(PROMOTION_MODAL.CREATE);

  const onClose = () => setModal(PROMOTION_MODAL.NONE);

  const onCreatePromotion = async (payload: IPromotionCreate) => {
    await createMutation.mutateAsync(payload);
    await queryClient.refetchQueries(["promotions"], { active: true });
    onClose();
  };

  const onChange: PaginationProps["onChange"] = (page, limit) => {
    setPaginate({ page, limit });
  };

  /**
   * MAIN RETURN
   */
  return (
    <Container>
      <div className="flex justify-end mb-2">
        <Button onClick={openCreateModal} size="large">
          +
        </Button>
      </div>
      <Table pagination={false} dataSource={promotions}>
        <Column title={<FormattedMessage id="code" />} dataIndex="code" />
        <Column
          title={<FormattedMessage id="description" />}
          dataIndex="description"
        />
        <Column
          title={<FormattedMessage id="price_drop" />}
          dataIndex="promoPrice"
          render={(value: number) =>
            value < 1 ? `${value * 100}%` : `${value} VND`
          }
        />
        <Column
          title={<FormattedMessage id="limit" />}
          dataIndex="purchasesLimit"
          render={(value: number, record: IPromotion) =>
            value === 0 ? `♾️` : `${record.purchasesCount || 0}/${value}`
          }
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
      <CreateModal
        toggleModal={setModal}
        open={modal === PROMOTION_MODAL.CREATE}
        onOk={onCreatePromotion}
        onClose={onClose}
      />
      <CategoryCreateModal
        open={modal === PROMOTION_MODAL.CATEGORY_CREATE}
        onClose={onClose}
      />
    </Container>
  );
};

export default Promotions;
