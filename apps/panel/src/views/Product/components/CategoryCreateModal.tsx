import { Modal } from "antd";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CategoryCreateModal = ({ open, onClose }: Props) => {
  return <Modal open={open} onCancel={onClose}></Modal>;
};

export default CategoryCreateModal;
