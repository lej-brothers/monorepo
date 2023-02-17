import sgMail from "@sendgrid/mail";
import { SENDGRID_API_KEY } from "./secrets";

sgMail.setApiKey(SENDGRID_API_KEY);

export { sgMail };
