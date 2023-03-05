import fs from "fs";
import path from "path";
import ejs from "ejs";
import { SendSmtpEmail } from "@sendinblue/client";
import { transactions } from "../configs/sib";
import { IOrderDocument } from "../model/order.model";
import { logger } from "../configs/pino";

interface MailPayload {
  subject: string;
  to: { name: string; email: string }[];
  html: string;
}

const MailService = {
  load: (name: string) => {
    const filePath = path.join(__dirname, `../templates/${name}.ejs`);
    return fs.readFileSync(filePath).toString();
  },

  send: async ({ subject, to, html }: MailPayload) => {
    let sendSmtpEmail = new SendSmtpEmail();

    console.log(subject, to);

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;
    sendSmtpEmail.sender = { name: "Le J` Cafe", email: "lejcafe@gmail.com" };
    sendSmtpEmail.to = to;

    try {
      transactions.sendTransacEmail(sendSmtpEmail).then(
        function (data: any) {
          logger.info(data);
        },
        function (error: any) {
          logger.error(error);
        }
      );
    } catch  {
      /** NOT TO MAKE POOR LIBRARY DESIGN CAUSE CRASH */
    }
  },

  order: async (order: IOrderDocument) => {
    const orderTemplate = MailService.load("order-confirmation");

    const html = ejs.render(orderTemplate, {
      _id: String(order._id),
      ...order.toJSON(),
    });

    await MailService.send({
      subject: `Thông báo đơn hàng số: ${order.code}`,
      to: [{ email: order.deliveryInfo.email, name: order.deliveryInfo.name }],
      html,
    });
  },
};

export default MailService;
