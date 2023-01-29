import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Drawer, Collapse, Button } from "antd";
import { FormattedMessage } from "react-intl";
import { CaretRightOutlined } from "@ant-design/icons";
import { Input, Textarea, Select } from "../../../components";
import { PRODUCT_MODAL } from "../constants";

const { Panel } = Collapse;

interface Props {
  open: boolean;
  onClose: () => void;
  toggleModal: (modal: PRODUCT_MODAL) => void;
}

const CreateDrawer: React.FC<Props> = ({ open, toggleModal, onClose }) => {
  const methods = useForm();

  return (
    <Drawer
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
              <div>
                <h1 className="text-base font-bold">
                  <FormattedMessage id="product.create.section.general" />
                </h1>
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
                  name="details"
                  className="mt-2"
                  addonBefore={"/"}
                  placeholder="robusta-langbiang"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">
                  <FormattedMessage id="product.create.price" />
                </label>
                <Input
                  type="number"
                  name="details"
                  className="mt-2"
                  addonAfter={"VND"}
                  placeholder="120000"
                />
              </div>
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
                  name="details"
                  className="mt-2"
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
