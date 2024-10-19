import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { SendMailDto } from 'src/mail/dto/MailDto.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('/emails')
export class EmailController {
  constructor(private amqpConnection: AmqpConnection) {}

  @Post('/send')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FilesInterceptor('files'))
  async sendEmail(
    @Body() sendEmailDto: SendMailDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    sendEmailDto.files = files;

    await this.amqpConnection.publish(
      'email_exchange',
      'send_email',
      sendEmailDto,
    );
    return { status: 'Email request sent successfully' };
  }

  @Post('/send-all')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FilesInterceptor('files'))
  async sendAllEmail(
    @Body() sendEmailDto: SendMailDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    sendEmailDto.files = files;

    await this.amqpConnection.publish(
      'email_all_exchange',
      'send_all_email',
      sendEmailDto,
    );
    return { status: 'Email request sent successfully' };
  }
}
