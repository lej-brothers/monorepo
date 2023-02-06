import { Button, Pagination, Table } from "antd";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Container } from "./styles";
import { useQueryClient } from "react-query";
import { PROMOTION_MODAL } from "./constants";
import usePromotions from "../../utils/usePromotions";

const { Column } = Table;

const Promotions: React.FC = () => {
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(PROMOTION_MODAL.NONE);
  const [{ page, limit }, setPaginate] = useState({ page: 1, limit: 20 });

  const { data } = usePromotions(page, limit);

  /**
   * MAPPED VALUES
   */
  const promotions = data?.docs || [];

  /**
   * EVENT HANDLER
   */
  const openCreateModal = () => setModal(PROMOTION_MODAL.CREATE);

  const onClose = () => setModal(PROMOTION_MODAL.NONE);

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
  );
};

export default Promotions;
