import { SupplementProduct } from '../repositories/supplementProduct.entity';
import {
  CreateSupplementProductDto,
  updateSupplementProductDto,
} from '../dtos/supplementProduct.dto';

export interface ISupplementProductService {
  findAll(): Promise<SupplementProduct[]>;
  findOne(id: number): Promise<SupplementProduct>;
  create(
    newSupplementProduct: CreateSupplementProductDto,
  ): Promise<SupplementProduct>;
  update(
    id: number,
    updateSupplementProduct: updateSupplementProductDto,
  ): Promise<SupplementProduct>;
  delete(id: number): Promise<void>;
  findByName(name: string): Promise<SupplementProduct[]>;
  findByType(typeId: number): Promise<SupplementProduct[]>;
}
