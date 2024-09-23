import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Controller('emails')
export class EmailController {
  constructor(private  amqpConnection: AmqpConnection) {}

  @Post('/send')
  async sendEmail(@Body() body: { to: string; subject: string; text: string }) {
    await this.amqpConnection.publish('email_exchange', 'send_email', body);
    return 
  }
}
