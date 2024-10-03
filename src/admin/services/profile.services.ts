import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Not, Repository } from 'typeorm';
import { IProfileService } from '../interfaces/profile.service.interface';
import { CreateProfileDto, updateProfileDto } from '../dtos/profile.dto';
import { Profile } from '../repositories/profile.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfileService implements IProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async findOneByEmail(data: { email: string }): Promise<Profile> {
    return await this.profileRepository.findOneBy({ email: data.email });
  }

  async findAll(): Promise<Profile[]> {
    return await this.profileRepository.find();
  }
  async findOne(id: number): Promise<Profile> {
    return await this.profileRepository.findOne({ where: { id } });
  }
  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    // Kiểm tra xem email đã tồn tại chưa
    const existingEmail = await this.profileRepository.findOneBy({
      email: createProfileDto.email,
    });
    if (existingEmail) {
      throw new BadRequestException('Đã tồn tại email này!');
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(createProfileDto.password, salt);

    createProfileDto.password = hashedPassword;

    const createdProfile = this.profileRepository.create(createProfileDto);
    return await this.profileRepository.save(createdProfile);
  }

  async update(id: number, updateProfile: updateProfileDto): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ where: { id } });
    if (updateProfile.email) {
      const existingEmail = await this.profileRepository.findOne({
        where: {
          email: updateProfile.email,
          id: Not(id), // Điều kiện loại trừ chính profile hiện tại
        },
      });
      if (existingEmail) {
        throw new BadRequestException('Đã tồn tại email này!');
      }
    }
    if (updateProfile.phoneNumber) {
      const existingPhoneNumber = await this.profileRepository.findOne({
        where: {
          phoneNumber: updateProfile.phoneNumber,
          id: Not(id),  // Điều kiện loại trừ chính profile hiện tại
        },
      });
      if (existingPhoneNumber) {
        throw new BadRequestException('Đã tồn tại số điện thoại này!');
      }
    }
  
    if (updateProfile.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(updateProfile.password, salt);
      updateProfile.password = hashedPassword;
    }
    Object.assign(profile, updateProfile);
    await this.profileRepository.update(id, updateProfile);
    return this.profileRepository.findOne({ where: { id } });
  }
  async delete(id: number): Promise<void> {
    // Kiểm tra xem id có tồn tại không
    const existingId = await this.profileRepository.findOneBy({ id });
    if (!existingId) {
      throw new HttpException('Id không tồn tại', HttpStatus.BAD_REQUEST);
    }
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
  async changePassword (id: number, password: string, newPassword: string): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ where: { id } });
    if (!bcrypt.compareSync(password, profile.password)) {
      throw new BadRequestException('Mật khẩu không chính xác!');
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);
    profile.password = hashedPassword;
    await this.profileRepository.update(id, profile);
    return this.profileRepository.findOne({ where: { id } });
  }
}
