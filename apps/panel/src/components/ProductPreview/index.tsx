import { Button, Table, Tag } from "antd";
import { Modal as AntModal } from "antd";
import { IOrder, ORDER_STATUS } from "common";
import { OrderQuery } from "queries";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

const { Column } = Table;

interface Props {
  open: boolean;
  onClose: () => void;
  orderId: string;
}

const ProductPreview: React.FC<Props> = ({ open, onClose, orderId }) => {
  const { data } = OrderQuery.useOrder(orderId);
  const { mutateAsync } = OrderQuery.useUpdateOrder();

  const updateStatus = async (status: ORDER_STATUS) => {
    const order = data as IOrder;
    await mutateAsync({ ...order, status });
  };

  /**
   * RENDERERS
   */

  const renderTitle = () => {
    return (
      <p className="text-xl mb-5 font-bold">
        <FormattedMessage id="order_infomation" values={{ id: data?.code }} />
      </p>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button
          onClick={updateStatus.bind(this, ORDER_STATUS.ReadyToDelivery)}
          className="mr-1"
        >
          <FormattedMessage id="button.ready_to_delivery" />
        </Button>

        <Button onClick={updateStatus.bind(this, ORDER_STATUS.Delivery)}>
          <FormattedMessage id="button.deliveried" />
        </Button>
      </>
    );
  };

  /**
   * MAIN RETURN
   */

  if (!data) return <></>;

  return (
    <Modal
      title={renderTitle()}
      footer={renderFooter()}
      closable={false}
      width={1000}
      open={open}
      onCancel={onClose}
    >
      <div className="flex mb-2 w-full flex-nowrap">
        <div className="flex-1 items-center">
          <label className="text-base font-bold">Tên người nhận:</label>
          <p className="text-base">{data.deliveryInfo.name}</p>
        </div>

        <div className="flex-1 items-center">
          <label className="text-base font-bold">Số điện thoại:</label>
          <p className="text-base">{data.deliveryInfo.phone}</p>
        </div>
      </div>
      <div className="flex mb-8 flex-nowrap">
        <div className="flex-1 items-center">
          <label className="text-base font-bold">Địa chỉ:</label>
          <p className="text-base">{data.deliveryInfo.address}</p>
        </div>

        <div className="flex-1 items-center">
          <label className="text-base font-bold">Email:</label>
          <p className="text-base">{data.deliveryInfo.email}</p>
        </div>
      </div>
      <p className="text-lg mb-2 font-bold">Danh sách sản phẩm</p>
      <Table pagination={false} dataSource={data.cart.products}>
        <Column title={<FormattedMessage id="name" />} dataIndex="title" />
        <Column title={<FormattedMessage id="count" />} dataIndex="quantity" />
        <Column
          title={<FormattedMessage id="grind" />}
          dataIndex="grind"
          render={(value) => <Tag>{value}</Tag>}
        />
        <Column title={<FormattedMessage id="notes" />} dataIndex="notes" />
      </Table>
    </Modal>
  );
};

export default ProductPreview;

const Modal = styled(AntModal)``;
