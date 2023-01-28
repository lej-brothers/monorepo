import { Modal } from "antd";
import { useForm, FormProvider } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { Input, Textarea } from "../../../components";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CategoryCreateModal = ({ open, onClose }: Props) => {
  const methods = useForm();

  return (
    <Modal
      title={<FormattedMessage id="category.modal.create.title" />}
      open={open}
      onCancel={onClose}
    >
      <FormProvider {...methods}>
        <div className="my-6">
          <div className="mb-5">
            <label className="text-sm font-semibold">
              <FormattedMessage id="name" />
            </label>
            <Input
              name="details"
              className="mt-2"
              placeholder="robusta-langbiang"
            />
          </div>
          <div className="mb-5">
            <label className="text-sm font-semibold">
              <FormattedMessage id="description" />
            </label>
            <Textarea
              rows={2}
              name="description"
              className="mt-2"
              placeholder="robusta-langbiang"
            />
          </div>
          <div className="mb-5">
            <label className="text-sm font-semibold">
              <FormattedMessage id="product.create.slug" />
            </label>
            <Input
              name="details"
              className="mt-2"
              addonBefore={"/"}
              placeholder="robusta-langbiang"
            />
          </div>
        </div>
      </FormProvider>
    </Modal>
  );
};

export default CategoryCreateModal;
