import { CreatePtPackagesDto, UpdatePtPackageDto } from './ptPackage.dto';
import {
  CreateServicePackageDto,
  UpdateServicePackageDto,
} from './servicePackage.dto';
import {
  CreateServicePackagePriceDto,
  UpdateServicePackagePriceDto,
} from './servicePackagePrice.dto';

export class CreateAllPtPackagesDto {
  createPtPackageDto: CreatePtPackagesDto;
  createServicePackageDto: CreateServicePackageDto;
  createPackagePriceDtoList: CreateServicePackagePriceDto[];
}
export class UpdateAllPtPackageDto {
  updatePtPackageDto: Partial<UpdatePtPackageDto>;
  updateServicePackageDto: Partial<UpdateServicePackageDto>;
  updatePackagePriceDtoList: Partial<UpdateServicePackagePriceDto[]>;
}
