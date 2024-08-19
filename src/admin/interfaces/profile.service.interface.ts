import { Profile } from '../repositories/profile.entity';
import { CreateProfileDto, updateProfileDto } from '../dtos/profile.dto';

export interface IProfileService {
  findAll(): Promise<Profile[]>;
  findOne(id: number): Promise<Profile>;
  create(newProfile: CreateProfileDto): Promise<Profile>;
  update(id: number, updateProfile: CreateProfileDto): Promise<Profile>;
  delete(id: number): Promise<void>;
  findByPhoneNumber(phoneNumber: string): Promise<Profile[]>;
  findOneByEmail(data: { email: string }): Promise<Profile>;
}
