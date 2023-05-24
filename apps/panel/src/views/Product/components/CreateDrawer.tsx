import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CaretRightOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Button, Collapse, Drawer, Table } from "antd";
import { IPriceVariant, IProductCreate } from "common";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { SLUG_VALIDATE_EX } from "../../../constants/regexs";
import { Input, Select, Switch, Textarea, Uploader } from "../../../components";
import { PRODUCT_MODAL } from "../constants";
import { CategoryQuery, ProductQuery } from "queries";
import PriceVariantDrawer from "./PriceVariantDrawerCreateModal";
import slugify from "../../../utils/slugify";

const { Panel } = Collapse;
const { Column } = Table;

interface Props {
  open: boolean;
  editing?: string;
  onClose: () => void;
  onSubmit: (data: IProductCreate) => void;
  toggleModal: (modal: PRODUCT_MODAL) => void;
  activeModal: PRODUCT_MODAL;
}

const CreateDrawer: React.FC<Props> = ({
  open,
  editing,
  onSubmit,
  toggleModal,
  activeModal,
  onClose,
}) => {
  const methods = useForm<IProductCreate>({
    resolver: yupResolver(productCreateSchema),
    defaultValues: { prices: [] },
  });
  
  const values = methods.watch();
  const title = methods.watch('title')
  const prices = methods.watch('prices')

  const { data } = CategoryQuery.useList();
  const _ = ProductQuery.useProduct(editing, {
    onSuccess: (editingData: any) => {
      methods.reset({
        _id: editingData._id,
        slug: editingData.slug,
        title: editingData.title,
        details: editingData.details,
        description: editingData.description,
        categories: editingData.categories.map(
          (categories: any) => categories._id
        ),
        isHighlight: editingData.isHighlight,
        isMetch: editingData.isMetch,
        count: editingData.warehourse.count,
        prices: editingData.warehourse.prices,
      });

      setImages(editingData.images);
    },
    enabled: !!editing,
    cacheTime: 0,
  });

  const [images, setImages] = useState<any>([]);

  const categories = data?.docs || [];

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category._id,
  }));

  const onCreateButtonClick = () => {
    const values = methods.getValues();
    onSubmit({...values});
  };

  const onCreatePriceVariant = useCallback((variant: IPriceVariant) => {
    const values = methods.getValues();
    methods.setValue("prices", [...(values.prices || []), variant]);
    toggleModal(PRODUCT_MODAL.NONE);
  }, [ methods ])
  
  const onRemovePriceVariant = (toRemove: number) => {
    const values = methods.getValues();
    methods.setValue("prices", values.prices.filter((_, index) => index !== toRemove));
  }

  useEffect(() => {
    methods.reset({});
    setImages([]);
  }, [methods, open]);

  useEffect(() => {
    if (title) {
      const slug = slugify(title)
      methods.setValue('slug', slug);
    }
  }, [title]);
  

  return (
    <Drawer
      extra={
        <Button onClick={onCreateButtonClick}>
          <FormattedMessage id={editing ? "update" : "create"} />
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
            <CaretRightOutlined rev='123' rotate={isActive ? 90 : 0} />
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
            <div className="grid mb-4 grid-cols-1 gap-4">
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
                <div className="flex items-center mb-2 justify-between">
                  <label className="text-sm font-semibold">
                    <FormattedMessage id="product.create.price" />
                  </label>
                  <Button
                    className="flex items-center justify-center"
                    onClick={toggleModal.bind(
                      this,
                      PRODUCT_MODAL.PRICE_VARIANT_CREATE
                    )}
                    size="small"
                  >
                    <PlusOutlined rev="123" size={8} />
                  </Button>
                </div>

                <Table dataSource={prices}>
                  <Column title={<FormattedMessage id="product_variant_modal.variant" />} dataIndex={['title']} render={(value) => value} />
                  <Column title={<FormattedMessage id="product_variant_modal.price" />} dataIndex={['price']} render={(value) => value} />
                  <Column width={30} dataIndex={['price']} render={(value, record, index) => <div className="flex justify-end">
                    <Button
                      className="flex items-center justify-center"
                      size="small"
                    >
                      <MinusOutlined rev="123" onClick={onRemovePriceVariant.bind(this, index)} size={8} />
                    </Button>
                  </div>} />
                </Table>
              
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
                images={images}
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
                    className="flex items-center justify-center"
                    onClick={() => toggleModal(PRODUCT_MODAL.CATEGORY_CREATE)}
                    size="small"
                  >
                    <PlusOutlined rev="123" />
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

      <PriceVariantDrawer
        open={activeModal === PRODUCT_MODAL.PRICE_VARIANT_CREATE}
        onClose={toggleModal.bind(this, PRODUCT_MODAL.NONE)}
        onSubmit={onCreatePriceVariant}
      />
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
