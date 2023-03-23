import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "antd";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Input } from "../../components";
import AuthorizationModule from "../../services/auth.service";

const authFormSchema = yup.object().shape({
  token: yup.string().required(),
});

interface IAuthForm {
  token: string;
}

const Auth: React.FC = () => {
  const intl = useIntl();
  const navigation = useNavigate();
  const methods = useForm<IAuthForm>({
    resolver: yupResolver(authFormSchema),
  });
  const values = methods.watch();

  const onOk = async () => {
    const success = await AuthorizationModule.auth(values.token);
    if (!success) return;
    sessionStorage.setItem("auth", `${success}`);
    navigation("/");
  };

  return (
    <Modal
      onOk={onOk}
      cancelButtonProps={{ style: { display: "none" } }}
      title={<FormattedMessage id="auth.login" />}
      open={true}
    >
      <FormProvider {...methods}>
        <Input
          name="token"
          className="my-3"
          placeholder={intl.formatMessage({ id: "auth.token.placeholder" })}
        />
      </FormProvider>
    </Modal>
  );
};

export default Auth;
