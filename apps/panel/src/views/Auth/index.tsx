import * as yup from "yup";
import { Modal } from "antd";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormattedMessage, useIntl } from "react-intl";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "../../components";

const authFormSchema = yup.object().shape({
  token: yup.string().required(),
});

interface IAuthForm {
  token: string;
}

const Auth: React.FC = () => {
  const intl = useIntl();
  const methods = useForm<IAuthForm>({
    resolver: yupResolver(authFormSchema),
  });

  return (
    <Modal title={<FormattedMessage id="auth.login" />} open={true}>
      <FormProvider {...methods}>
        <Input
          name="token"
          placeholder={intl.formatMessage({ id: "auth.token.placeholder" })}
        />
      </FormProvider>
    </Modal>
  );
};

export default Auth;
