import { Button, Pagination, PaginationProps, Table } from "antd";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Container } from "./styles";
import { useMutation, useQueryClient } from "react-query";
import { PROMOTION_MODAL } from "./constants";
import usePromotions from "../../utils/usePromotions";
import { CreateModal } from "./components";
import { IPromotion, IPromotionCreate } from "common";
import PromotionModule from "../../modules/promotion";

const { Column } = Table;

const Promotions: React.FC = () => {
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(PROMOTION_MODAL.NONE);
  const [{ page, limit }, setPaginate] = useState({ page: 1, limit: 20 });

  const { data } = usePromotions(page, limit);

  const createMutation = useMutation<IPromotion, unknown, IPromotionCreate>(
    "create-promotion",
    PromotionModule.create
  );

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
        <Column
          title={<FormattedMessage id="product.create.name" />}
          dataIndex="code"
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
        open={modal === PROMOTION_MODAL.CREATE}
        onOk={onCreatePromotion}
        onClose={onClose}
      />
    </Container>
  );
};

export default Promotions;
