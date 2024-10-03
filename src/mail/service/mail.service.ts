import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailDto } from '../dto/MailDto.dto';
import { send } from 'process';
import { Nack } from '@golevelup/nestjs-rabbitmq';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private userService: UserService,
  ) {}

  async sendEmail(sendMailDto: SendMailDto) {
    const { recipients, from, subject, html, files } = sendMailDto;

    try {
      const emailSend = await this.mailerService.sendMail({
        to: recipients,
        from: {
          name: '4GYM',
          address: 'hukhan013@gmail.com',
        },
        subject: subject,
        html: html,
        attachments: files
          ? files.map((file) => ({
              filename: file.originalname,
              content: Buffer.isBuffer(file.buffer)
                ? file.buffer
                : Buffer.from(file.buffer),
              contentType: file.mimetype,
            }))
          : [],
      });

      return emailSend;
    } catch (error) {
      console.error('Error sending email:', error);
      return new Nack();
    }
  }

  /// <----------- send to ALL USER ----------->
  async sendAllEmail(sendMailDto: SendMailDto) {
    const { recipients, from, subject, html, files } = sendMailDto;
    const allEmail = await this.userService.getAllEmail();
    const emailArray = allEmail.map((user) => user.email);


    try {
      const emailSend = await this.mailerService.sendMail({
        to: emailArray,
        from: {
          name: '4GYM',
          address: 'hukhan013@gmail.com',
        },
        subject: subject,
        html: html,
        attachments: files
          ? files.map((file) => ({
              filename: file.originalname,
              content: Buffer.isBuffer(file.buffer)
                ? file.buffer
                : Buffer.from(file.buffer),
              contentType: file.mimetype,
            }))
          : [],
      });

      return emailSend;
    } catch (error) {
      console.error('Error sending email:', error);
      return new Nack();
    }
  }
}
