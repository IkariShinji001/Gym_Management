import { CreateServicePackageDto } from '../dtos/servicePackage.dto';
import { ServicePackages } from '../repositories/servicePackage.entity';

export interface IServicePackageService {
  findAll(): Promise<ServicePackages[]>;
  create(newServicePackage: CreateServicePackageDto): Promise<ServicePackages>
  delete(servicePackageId: number):Promise<void>
}
