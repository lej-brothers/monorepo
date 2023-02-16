import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CaretRightOutlined } from "@ant-design/icons";
import { Button, Collapse, Drawer } from "antd";
import { IProductCreate } from "common";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { SLUG_VALIDATE_EX } from "../../../constants/regexs";
import { Input, Select, Switch, Textarea, Uploader } from "../../../components";
import useCategories from "../../../utils/useCategories";
import { PRODUCT_MODAL } from "../constants";

const { Panel } = Collapse;

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: IProductCreate) => void;
  toggleModal: (modal: PRODUCT_MODAL) => void;
}

const CreateDrawer: React.FC<Props> = ({
  open,
  onSubmit,
  toggleModal,
  onClose,
}) => {
  const methods = useForm<IProductCreate>({
    resolver: yupResolver(productCreateSchema),
  });

  const values = methods.watch();
  const { data } = useCategories();

  const categories = data?.docs || [];

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category._id,
  }));

  const onCreateButtonClick = () => onSubmit(values);

  return (
    <Drawer
      extra={
        <Button onClick={onCreateButtonClick}>
          <FormattedMessage id="create" />
        </Button>
      }
      title={<FormattedMessage id="product.create.title" />}
      width={720}
      open={open}
      onClose={onClose}
    >
      <FormProvider {...methods}>
        <Collapse
          bordered={false}
          defaultActiveKey={["1", "2"]}
          style={{ background: "transparent" }}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
        >
          <Panel
            header={
              <div
                onClick={(event: any) => event.stopPropagation()}
                className="flex items-center"
              >
                <h1 className="text-base font-bold">
                  <FormattedMessage id="product.create.section.general" />
                </h1>
                <Switch
                  checkedChildren="Metch"
                  unCheckedChildren="Normal"
                  className="ml-2"
                  name="isMetch"
                />
              </div>
            }
            key="1"
          >
            <div className="grid mb-4 grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold">
                  <FormattedMessage id="product.create.name" />
                </label>
                <Input
                  className="mt-2"
                  name="title"
                  placeholder="Robusta LangBiang"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">
                  <FormattedMessage id="product.create.details" />
                </label>
                <Input
                  name="details"
                  className="mt-2"
                  placeholder="high acidity, roasted nuts,.."
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-sm font-semibold">
                <FormattedMessage id="product.create.description" />
              </label>
              <Textarea
                rows={4}
                className="mt-2"
                name="description"
                placeholder="Từ vùng núi LangBiang ở Lâm Đồng.."
              />
            </div>
            <div className="grid mb-4 grid-cols-2 gap-4">
              <div>
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
              <div>
                <label className="text-sm font-semibold">
                  <FormattedMessage
                    id={
                      values.isMetch
                        ? "product.create.metch_price"
                        : "product.create.price"
                    }
                  />
                </label>
                <Input
                  type="number"
                  name="price"
                  className="mt-2"
                  addonAfter={"VND"}
                  placeholder="120000"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">
                  <FormattedMessage id="product.create.count" />
                </label>
                <Input
                  type="number"
                  name="count"
                  className="mt-2"
                  addonAfter={!values.isMetch && "Gram"}
                  placeholder="120000"
                />
              </div>
            </div>
            <div>
              <Uploader
                onChange={(ids) => {
                  methods.setValue("images", ids);
                }}
              />
            </div>
          </Panel>
          <Panel
            header={
              <h1 className="text-base font-bold">
                <FormattedMessage id="product.create.section.organize" />
              </h1>
            }
            key="2"
          >
            <div className="grid mb-4 grid-cols-2 gap-4">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold">
                    <FormattedMessage id="product.create.category" />
                  </label>
                  <Button
                    onClick={() => toggleModal(PRODUCT_MODAL.CATEGORY_CREATE)}
                    size="small"
                  >
                    +
                  </Button>
                </div>
                <Select
                  name="categories"
                  className="mt-2"
                  options={categoryOptions}
                  placeholder="Category"
                  mode="multiple"
                  suffixIcon="+"
                />
              </div>
            </div>
          </Panel>
        </Collapse>
      </FormProvider>
    </Drawer>
  );
};

export default CreateDrawer;

const productCreateSchema = yup.object().shape({
  slug: yup
    .string()
    .matches(SLUG_VALIDATE_EX, "Please enter correct slug")
    .required(),
  title: yup.string().required(),
  details: yup.string().required(),
  description: yup.string().required(),
  categories: yup.array().of(yup.string()),
  isMetch: yup.boolean(),
  price: yup.number().required(),
  count: yup.number().required(),
});
