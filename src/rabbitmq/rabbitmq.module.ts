import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MailModule } from 'src/mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailController } from './controller/mail.controller';
import { MessagingService } from 'src/mail/service/messaging.service';
import { EmailService } from 'src/mail/service/mail.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([MailModule]),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: () => ({
        exchanges: [
          {
            name: 'email_exchange',
            type: 'topic',
          },
          {
            name: 'email_all_exchange', 
            type: 'topic',
          },
          
        ],
        uri: 'amqp://guest:guest@localhost:5672',
        connectionInitOptions: { wait: true, reject: true, timeout: 3000 },
      }),
    }),
  ],
  controllers: [EmailController],
  providers: [MessagingService, EmailService],
})
export class RabbitmqModule {}
