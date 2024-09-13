import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { BillController } from './controllers/bill.controller';
import { BillService } from './services/bill.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bills } from './repositories/bill.entity';
import { BillDetail } from './repositories/billDetail.entity';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SERVER',
        transport: Transport.GRPC,
        options: {
          package: 'SERVER',
          protoPath: [
            join(__dirname, '../admin/protos/admin.proto'),
            join(__dirname, '../user/protos/user.proto'),
            join(__dirname, '../user/protos/voucher.proto'),
            join(__dirname, '../service-package/protos/servicePackage.proto'),
          ],
        },
      },
    ]),
    TypeOrmModule.forFeature([Bills, BillDetail]),
  ],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
