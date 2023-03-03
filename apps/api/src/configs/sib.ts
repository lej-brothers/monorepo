import { TransactionalEmailsApi, TransactionalEmailsApiApiKeys } from "@sendinblue/client";
import { SEND_IN_BLUE_KEY } from "./secrets";

export const transactions = new TransactionalEmailsApi();

transactions.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
  SEND_IN_BLUE_KEY
);
