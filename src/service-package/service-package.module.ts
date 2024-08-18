import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FitnessPackages } from './repositories/fitnessPackage.entity';
import { PackageDuration } from './repositories/packageDuration.entity';
import { PtPackages } from './repositories/ptPackage.entity';
import { ServicePackagePrice } from './repositories/servicePackagePrice.entity';
import { ServicePackages } from './repositories/servicePackage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FitnessPackages,
      PackageDuration,
      PtPackages,
      ServicePackagePrice,
      ServicePackages,
    ]),
  ],
})
export class ServicePackageModule {}
