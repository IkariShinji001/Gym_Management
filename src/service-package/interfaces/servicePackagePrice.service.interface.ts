import {
  CreateServicePackagePriceDto,
  UpdateServicePackagePriceDto,
} from '../dtos/servicePackagePrice.dto';
import { ServicePackages } from '../repositories/servicePackage.entity';
import { ServicePackagePrice } from '../repositories/servicePackagePrice.entity';

export interface IServicePackagePriceService {
  findAll(): Promise<ServicePackagePrice[]>;
  findByServicePackage(
    servicePackageId: number,
  ): Promise<ServicePackagePrice[]>;
  createPackagePrice(
    createPackePriceDto: CreateServicePackagePriceDto,
    createdSP:ServicePackages
  ): Promise<ServicePackagePrice>;
  updatePackagePrice(
    packagePriceId: number,
    updatePackagePriceDto: UpdateServicePackagePriceDto,
    existedSP: ServicePackages
  ): Promise<ServicePackagePrice>;
  deletePackagePrice(packagePriceId: number): Promise<void>;
}
