import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailDto } from '../dto/MailDto.dto';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(sendMailDto: SendMailDto) {
    const { recipients, from, subject, html } = sendMailDto;
    try {
      const emailSend = await this.mailerService.sendMail({
        to: recipients,
        from: from ,
        subject: subject,
        html: html,
      });
      return emailSend;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new HttpException(
        'Error sending email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
