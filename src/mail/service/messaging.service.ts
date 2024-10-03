import { Injectable } from '@nestjs/common';
import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { EmailService } from 'src/mail/service/mail.service';
import { SendMailDto } from 'src/mail/dto/MailDto.dto';

@Injectable()
export class MessagingService {
  constructor(private emailService: EmailService) {}

  @RabbitRPC({
    exchange: 'email_exchange',
    routingKey: 'send_email',
    queue: 'email_queue',
  })
  async handleSendEmailRequest(sendMailDto: SendMailDto) {
    await this.emailService.sendEmail(sendMailDto);
    return { status: 'Email sent' };
  }

  @RabbitRPC({
    exchange: 'email_all_exchange',
    routingKey: 'send_all_email',
    queue: 'all_email_queue',
  })
  async handleSendAllEmailRequest(sendMailDto: SendMailDto) {
    await this.emailService.sendAllEmail(sendMailDto);
    return { status: 'Email sent' };
  }
}
