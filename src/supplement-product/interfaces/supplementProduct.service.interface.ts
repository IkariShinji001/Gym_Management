import { SupplementProduct } from '../repositories/supplementProduct.entity';
import {
  CreateSupplementProductDto,
  updateSupplementProductDto,
} from '../dtos/supplementProduct.dto';

export interface ISupplementProductService {
  findAll(): Promise<SupplementProduct[]>;
  findOne(id: number): Promise<SupplementProduct>;
  create(newFacility: CreateSupplementProductDto): Promise<SupplementProduct>;
  update(
    id: number,
    updateFacility: updateSupplementProductDto,
  ): Promise<SupplementProduct>;
  delete(id: number): Promise<void>;
  findByName(name: string): Promise<SupplementProduct[]>;
}
