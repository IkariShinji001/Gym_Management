export interface IMailService {
    sendMail(content: Object): Promise<void>;
}
