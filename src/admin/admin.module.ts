import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './repositories/admin.entity';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.services';

@Module({
    imports: [TypeOrmModule.forFeature([Admin])],
    controllers: [AdminController],
    providers  : [AdminService],
})
export class AdminModule {}
