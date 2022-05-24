import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData} from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6c3c69434b26fe",
    pass: "299ff6573da1d4"
  }
});


export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body} : SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Roberto Luiz <luizroberto1957@hotmail.com>',
      subject,
      html: body
    })
  };
}