import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { IProfileService } from '../interfaces/profile.service.interface';
import { CreateProfileDto, updateProfileDto } from '../dtos/profile.dto';
import { Profile } from '../repositories/profile.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class                                                                             ProfileService implements IProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  findOneByEmail(data: { email: string }): Promise<Profile> {
    return this.profileRepository.findOneBy({ email: data.email });
  }

  async findAll(): Promise<Profile[]> {
    return await this.profileRepository.find();
  }
  async findOne(id: number): Promise<Profile> {
    return await this.profileRepository.findOne({ where: { id } });
  }

  // validate EMAIL
  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(createProfileDto.password, salt);

    createProfileDto.password = hashedPassword;

    const createdProfile = this.profileRepository.create(createProfileDto);
    return await this.profileRepository.save(createdProfile);
  }

  async update(id: number, updateProfile: updateProfileDto): Promise<Profile> {
    await this.profileRepository.update(id, updateProfile);
    return this.profileRepository.findOne({ where: { id } });
  }
  async delete(id: number): Promise<void> {
    const deletedAdmin = await this.profileRepository.findOne({
      where: { id },
    });
    await this.profileRepository.delete(deletedAdmin);
  }
  async findByPhoneNumber(phoneNumber: string): Promise<Profile[]> {
    const admins = await this.profileRepository.find({
      where: {
        phoneNumber: Like(`%${phoneNumber}%`),
      },
    });
    return admins;
  }
}
