import SibApiV3Sdk from "@sendinblue/client";
import { SEND_IN_BLUE_KEY } from "./secrets";

export const transactions = new SibApiV3Sdk.TransactionalEmailsApi();

transactions.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  SEND_IN_BLUE_KEY
);
