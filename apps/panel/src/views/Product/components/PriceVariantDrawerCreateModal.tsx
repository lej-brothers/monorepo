import { Modal } from "antd";
import { IPriceVariant } from "common";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { Input } from "../../../components";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (variant: IPriceVariant) => void;
}

const PriceVariantDrawer: React.FC<Props> = ({ open, onClose, onSubmit }) => {
  const methods = useForm<IPriceVariant>();

  /**
   * SIDE-EFFECTS
   */

  useEffect(() => {
    if (open) methods.reset();
  }, [methods, open]);

  /**
   * MAIN RETURN
   */

  return (
    <Modal
      zIndex={2000}
      title={<FormattedMessage id="price_variant.modal.create.title" />}
      open={open}
      onOk={() => onSubmit(methods.getValues())}
      onCancel={onClose}
    >
      <FormProvider {...methods}>
        <div className="my-6">
          <div className="mb-5">
            <label className="text-sm font-semibold">
              <FormattedMessage id="product_variant_modal.variant" />
            </label>
            <Input
              name="title"
              className="mt-2"
              placeholder="100G, 200G,.."
            />
          </div>
          <div>
            <label className="test-sm font-semibold">
              <FormattedMessage id="product_variant_modal.price" />
            </label>
            <Input
              name="price"
              className="mt-2"
              type="number"
              placeholder="100, 200,.."
            />
          </div>
        </div>
      </FormProvider>
    </Modal>
  );
};

export default PriceVariantDrawer;
