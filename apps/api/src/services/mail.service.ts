import fs from "fs";
import path from "path";
import ejs from "ejs";
import * as SibApiV3Sdk from "sib-api-v3-typescript";
import { transactions } from "../configs/sib";
import { IOrderDocument } from "../model/order.model";

const MailService = {
  order: async (order: IOrderDocument) => {
    const orderTemplate = fs
      .readFileSync(path.join(__dirname, "../templates/order-confirmation.ejs"))
      .toString();

    const html = ejs.render(orderTemplate, {
      _id: String(order._id),
      ...order.toJSON(),
    });

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = `Thông báo đơn hàng số: ${order.code}`;
    sendSmtpEmail.htmlContent = html;
    sendSmtpEmail.sender = { name: "Le J` Cafe", email: "lejcafe@gmail.com" };
    sendSmtpEmail.to = [
      { email: "nguyengiatuan3110@gmail.com", name: "Nguyen Gia Tuan" },
    ];

    const res = transactions.sendTransacEmail(sendSmtpEmail).then(
      function (data: any) {
        console.log(
          "API called successfully. Returned data: " + JSON.stringify(data)
        );
      },
      function (error: any) {
        console.error(error);
      }
    );
  },
};

export default MailService;
