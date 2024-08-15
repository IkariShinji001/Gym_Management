import { Admin } from './../repositories/admin.entity';
import { CreateAdminDto, updateAdminDto } from '../dtos/admin.dto';

export interface IFacilitiesService {
  findAll(): Promise<Admin[]>;
  findOne(id: number): Promise<Admin>;
  create(newFacility: CreateAdminDto): Promise<Admin>;
  update(id: number, updateFacility: updateAdminDto): Promise<Admin>;
  delete(id: number): Promise<void>;
  findByPhoneNumber(phoneNumber: string): Promise<Admin[]>;
}
