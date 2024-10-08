import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BillModule } from './bill/bill.module';
import { ServicePackageModule } from './service-package/service-package.module';
import { AdminModule } from './admin/admin.module';
import { SupplementProductModule } from './supplement-product/supplement-product.module';
import { FacilitiesModule } from './facilities/facilities.module';
import { SharedModule } from './shared/shared.module';
import { DatabaseConfigService } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/jwt-auth.guard';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryProvider } from './cloudinary/cloudinary';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { BranchModule } from './branch/branch.module';
import { StripeModule } from './stripe/stripe.module';
import { MailModule } from './mail/mail.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    AdminModule,
    UserModule,
    BillModule,
    AdminModule,
    SupplementProductModule,
    FacilitiesModule,
    SharedModule,
    AuthModule,
    CloudinaryModule, 
    ServicePackageModule,
    BranchModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CloudinaryService,
    CloudinaryProvider,
    // // {
    // //   provide: APP_GUARD,
    // //   useClass: AuthGuard,
    // // },
  ],
})
export class AppModule {}
