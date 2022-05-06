export interface SendMailData {
    subject: string;
    body: string;
}

export interface IMailProvider {
    sendMail: (data: SendMailData) => Promise<void>;
}