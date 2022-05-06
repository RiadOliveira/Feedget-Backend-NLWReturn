import nodemailer from 'nodemailer';
import { IMailProvider, SendMailData } from "../IMailProvider";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "85824805e48788",
      pass: "415ada11700986"
    }
});

export class NodemailerMailProvider implements IMailProvider {
    public async sendMail({subject, body}: SendMailData): Promise<void> {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Ríad Oliveira <riad.oliveira@hotmail.com>',
            subject,
            html: body
        });
    }
}