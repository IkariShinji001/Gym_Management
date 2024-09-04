import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FitnessPackage } from './repositories/fitnessPackage.entity';
import { PackageDuration } from './repositories/packageDuration.entity';
import { PtPackages } from './repositories/ptPackage.entity';
import { ServicePackagePrice } from './repositories/servicePackagePrice.entity';
import { ServicePackages } from './repositories/servicePackage.entity';
import { ServicePackagesService } from './services/servicePackage.service';
import { ServicePackageController } from './controllers/servicePackage.controller';
import { PackageBenefits } from './repositories/packageBenefit.entity';
import { FitnessBenefits } from './repositories/fitnessBenefit.entity';
import { FitnessPackageController } from './controllers/fitnessPackage.controller';
import { FitnessPackageService } from './services/fitnessPackage.service';
import { PackageDurationService } from './services/packageDuration.service';
import { PackageDurationController } from './controllers/packageDuration.controller';
import { ServicePackagePriceService } from './services/servicePackagePrice.service';
import { PackagePriceController } from './controllers/packagePrice.controller';
import { PtPackagesService } from './services/ptPackage.service';
import { PtPackagesController } from './controllers/ptPackage.controller';
import { AdminModule } from 'src/admin/admin.module';
import { FitnessBenefitService } from './services/fitnessBenefit.service';
import { PackageBenefitService } from './services/packageBenefit.service';
import { FitnessBenefitsController } from './controllers/fitnessBenefit.controller';
import { PackageBenefitController } from './controllers/packageBenefit.controller';
import { ServicePackageType } from './repositories/servicePackageType.entity';
import { ServiceTypeController } from './controllers/servicePackageType.controller';
import { ServiceTypeService } from './services/servicePackageType.service';

@Module({
  imports: [
    AdminModule,
    TypeOrmModule.forFeature([
      FitnessPackage,
      PackageDuration,
      PtPackages,
      ServicePackagePrice,
      ServicePackages,
      PackageBenefits,
      FitnessBenefits,
      ServicePackageType,
    ]),
  ],
  providers: [
    ServicePackagesService,
    FitnessPackageService,
    PackageDurationService,
    ServicePackagePriceService,
    PtPackagesService,
    PackageBenefitService,
    FitnessBenefitService,
    ServiceTypeService,
  ],
  controllers: [
    ServicePackageController,
    FitnessPackageController,
    PackageDurationController,
    PackagePriceController,
    PtPackagesController,
    FitnessBenefitsController,
    PackageBenefitController,
    ServiceTypeController,
  ],
})
export class ServicePackageModule {}
