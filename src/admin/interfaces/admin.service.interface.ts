import { Admin } from '../repositories/admin.entity';
import { CreateAdminDto, updateAdminDto } from '../dtos/admin.dto';

export interface IAdminService {
  findAll(): Promise<Admin[]>;
  findOne(id: number): Promise<Admin>;
  create(newAdmin: CreateAdminDto): Promise<Admin>;
  update(id: number, updateAdmin: updateAdminDto): Promise<Admin>;
  delete(id: number): Promise<void>;
  findByPhoneNumber(phoneNumber: string): Promise<Admin[]>;
  findOneByEmail(email: string): Promise<Admin>;
  login(email: string, password: string): Promise<{ access_token: string }>;
}
