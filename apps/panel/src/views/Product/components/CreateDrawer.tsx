import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Drawer, Collapse, theme } from "antd";
import { FormattedMessage } from "react-intl";
import { CaretRightOutlined } from "@ant-design/icons";
import { Input } from "../../../components";
import Textarea from "../../../components/Textarea";

const { Panel } = Collapse;

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateDrawer: React.FC<Props> = ({ open, onClose }) => {
  const methods = useForm();

  const onFinish = (a: any) => {
    console.log(a);
  };

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
          defaultActiveKey={["1"]}
          style={{ background: "transparent" }}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
        >
          <Panel
            header={
              <h1 className="text-base font-bold">
                <FormattedMessage id="product.create.section.general" />
              </h1>
            }
            key="1"
          >
            <div className="grid mb-4 grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold">
                  <FormattedMessage id="product.create.name" />
                </label>
                <Input className="mt-2" name="title" placeholder="Robusta LangBiang" />
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
                  addonBefore={'/'}
                  placeholder="robusta-langbiang"
                />
              </div>
            </div>
          </Panel>
        </Collapse>
      </FormProvider>

      {/* <Form {...LAUOUT} layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="title"
          label={<FormattedMessage id="product.create.name" />}
        >
          <Input allowClear style={{ maxWidth: 300 }} />
        </Form.Item>
      </Form> */}
    </Drawer>
  );
};

export default CreateDrawer;

const LAUOUT = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
