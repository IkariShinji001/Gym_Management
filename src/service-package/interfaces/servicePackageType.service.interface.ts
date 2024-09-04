import {
  CreateServiceTypeDto,
  UpdateServiceTypeDto,
} from '../dtos/servicePackageType.dto';
import { ServicePackageType } from '../repositories/servicePackageType.entity';

export interface IServiceTypeService {
  findAll(): Promise<ServicePackageType[]>;
  findOneById(typeId: number): Promise<ServicePackageType>;
  create(
    createServiceTypeDto: CreateServiceTypeDto,
  ): Promise<ServicePackageType>;
  update(
    typeId: number,
    updateServiceTypeDto: UpdateServiceTypeDto,
  ): Promise<ServicePackageType>;
  delete(typeId: number): Promise<void>;
}
