import { Modal } from "antd";
import { useQueryClient } from "react-query";
import { useForm, FormProvider } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { Input, Textarea } from "../../../components";
import { ICategoryCreate } from "common";
import { CategoryQuery } from "queries";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CategoryCreateModal = ({ open, onClose }: Props) => {
  const queryClient = useQueryClient();
  const methods = useForm<ICategoryCreate>();
  const values = methods.watch();

  const { mutate } = CategoryQuery.useCreate();

  // const { mutate } = useMutation<ICategory, unknown, ICategoryCreate>(
  //   "create-category",
  //   CategoryModule.create,
  //   {
  //     onSuccess: async () => {
  //       await queryClient.refetchQueries(["categories"], { active: true });
  //       onClose();
  //     },
  //   }
  // );

  const onOk = async () => mutate(values);

  return (
    <Modal
      title={<FormattedMessage id="category.modal.create.title" />}
      open={open}
      onOk={onOk}
      onCancel={onClose}
    >
      <FormProvider {...methods}>
        <div className="my-6">
          <div className="mb-5">
            <label className="text-sm font-semibold">
              <FormattedMessage id="name" />
            </label>
            <Input
              name="name"
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
              name="slug"
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
