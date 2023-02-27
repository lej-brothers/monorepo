import {
  Select as AntdSelect,
  Button,
  Col,
  DatePicker,
  Modal,
  Row,
  Tag,
  Tooltip,
} from "antd";
import { IPromotionCreate } from "common";
import { InfoCircleOutlined } from "@ant-design/icons";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { Input, Select, Textarea } from "../../../../components";
import { PROMOTION_MODAL } from "../../constants";
import { ProductQuery } from "queries";

const { RangePicker } = DatePicker;

const { Option, OptGroup } = AntdSelect;

interface Props {
  open: boolean;
  onClose: () => void;
  onOk: (payload: IPromotionCreate) => Promise<void>;
  toggleModal: (modal: PROMOTION_MODAL) => void;
}

const CreateModal: React.FC<Props> = ({ toggleModal, open, onOk, onClose }) => {
  const methods = useForm<IPromotionCreate>();
  const values = methods.watch();

  const { data } = ProductQuery.useProductOptions();

  /**
   * MAPPED-VALUES
   */

  const options = (data?.docs || []).map((doc) => ({
    ...doc,
    value: doc._id,
    label: doc.title,
  }));

  const categories = options.reduce((pre, cur) => {
    cur.categories.forEach((category) => {
      pre[category._id] = category.name;
    });
    return pre;
  }, {} as any);

  const categoryOptions = Object.keys(categories).map((name) => ({
    label: categories[name],
    value: name,
  }));

  /**
   * EVENT HANDLERS
   */

  const onSubmit = () => {
    onOk(values);
  };

  /**
   * RENDERERS
   */

  const tagRender = (props: CustomTagProps) => {
    const { value, closable, onClose } = props;
    const item = options.find((option) => option._id === value);
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3, display: "flex", alignItems: "center" }}
      >
        {item?.title}
      </Tag>
    );
  };

  return (
    <Modal open={open} onOk={onSubmit} onCancel={onClose}>
      <FormProvider {...methods}>
        <div className="grid mb-4 grid-cols-1 gap-4">
          <div className="flex flex-col">
            <label className="text-sm mb-2 font-semibold">
              <FormattedMessage id="code" />
            </label>
            <Input name="code" placeholder="THUHIGH" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm mb-2 font-semibold">
              <FormattedMessage id="product" />
            </label>
            <Select
              mode="multiple"
              tagRender={tagRender}
              showSearch={false}
              dropdownMatchSelectWidth={false}
              name="products"
            >
              {Object.keys(categories).map((categoryId) => (
                <OptGroup key={categoryId} label={categories[categoryId]}>
                  {options
                    .filter((o) =>
                      o.categories.find(
                        (category) => category._id === categoryId
                      )
                    )
                    .map((option) => (
                      <Option
                        style={{
                          marginRight: 3,
                          display: "flex",
                          alignItems: "center",
                        }}
                        label={option.title}
                        value={option._id}
                        key={option._id + categoryId}
                      >
                        <Row gutter={32}>
                          <Col span={6}>
                            {(option.images[0] as any)?.url && (
                              <img
                                width={32}
                                height={32}
                                src={(option.images[0] as any)?.url}
                                alt={option.slug}
                              />
                            )}
                          </Col>
                          <Col span={12}>
                            <div className="flex w-full h-full justify-center items-center">
                              {option.title}
                            </div>
                          </Col>
                        </Row>
                      </Option>
                    ))}
                </OptGroup>
              ))}
            </Select>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold">
                <FormattedMessage id="product.create.category" />
              </label>
              <Button
                onClick={() => toggleModal(PROMOTION_MODAL.CATEGORY_CREATE)}
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
        <div className="mb-4">
          <label className="text-sm font-semibold">
            <FormattedMessage id="description" />
          </label>
          <Textarea name="description" placeholder="Thứ 2 là ngày đầu tuần" />
        </div>
        <div className="grid mb-4 grid-cols-2 gap-4">
          <div className="flex mb-4 flex-col">
            <label className="text-sm mb-2 font-semibold">
              <FormattedMessage id="valid" />
            </label>
            <RangePicker
              onChange={(values) => {
                if (values?.[0])
                  methods.setValue(
                    "activeFrom",
                    new Date(values[0].toISOString())
                  );
                if (values?.[1])
                  methods.setValue(
                    "activeTo",
                    new Date(values[1].toISOString())
                  );
              }}
            />
          </div>
          <div className="flex mb-4 flex-col">
            <label className="text-sm mb-2 font-semibold">
              <FormattedMessage id="limit" />
            </label>
            <Input name="purchasesLimit" type="number" />
          </div>

          <div className="flex mb-4 flex-col">
            <label className="flex items-center text-sm mb-2 font-semibold">
              <FormattedMessage id="price_drop" />
              <Tooltip title={<FormattedMessage id="price_drop.tooltip" />}>
                <InfoCircleOutlined className="ml-1" />
              </Tooltip>
            </label>
            <Input name="promoPrice" placeholder="100000" />
          </div>
        </div>
      </FormProvider>
    </Modal>
  );
};

export default CreateModal;
