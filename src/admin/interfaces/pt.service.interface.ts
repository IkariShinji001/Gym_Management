import { createImagesDto } from '../dtos/createImages.dto';
import { CreateProfileDto, updateProfileDto } from '../dtos/profile.dto';
import { CreatePtDto, UpdatePtDto } from '../dtos/pt.dto';
import { Profile } from '../repositories/profile.entity';
import { Pt } from '../repositories/pt.entity';

export interface IPtService {
  findAll(): Promise<Pt[]>;
  findOne(id: number): Promise<Pt>;
  create(newProfile: CreateProfileDto, ptInfoDto: CreatePtDto, imageDto: createImagesDto[]): Promise<Pt>;
  update(id: number, updateInfo: UpdatePtDto): Promise<Pt>;
  delete(id: number): Promise<void>;
}
