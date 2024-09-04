import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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
    // Kiểm tra xem email đã tồn tại chưa
    const existingEmail = await this.profileRepository.findOneBy({
      email: createProfileDto.email,
    });
    if (existingEmail) {
      throw new BadRequestException('Đã tồn tại email này!');
    }
    // Kiểm tra xem số điện thoại đã tồn tại chưa
    // const existingPhoneNumber = await this.profileRepository.findOneBy({
    //   phoneNumber: createProfileDto.phoneNumber,
    // });
    // if (existingPhoneNumber) {
    //   throw new BadRequestException('Đã tồn tại số điện thoại này!');
    // }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(createProfileDto.password, salt);

    createProfileDto.password = hashedPassword;

    const createdProfile = this.profileRepository.create(createProfileDto);
    return await this.profileRepository.save(createdProfile);
  }

  async update(id: number, updateProfile: updateProfileDto): Promise<Profile> {
    // Kiểm tra xem email đã tồn tại chưa

    if (updateProfile.email) {
      const existingEmail = await this.profileRepository.findOne({
        where: {
          email: updateProfile.email,
        },
      });

      console.log(existingEmail);
      if (existingEmail && existingEmail.email !== updateProfile.email) {
        console.log('email');
        throw new BadRequestException('Đã tồn tại email này!');
      }
    }
    if (updateProfile.phoneNumber) {
      // Kiểm tra xem số điện thoại đã tồn tại chưa
      const existingPhoneNumber = await this.profileRepository.findOne({
        where: {
          phoneNumber: updateProfile.phoneNumber,
        },
      });
      if (existingPhoneNumber && existingPhoneNumber.phoneNumber !== updateProfile.phoneNumber) {
        console.log('phone');
        throw new BadRequestException('Đã tồn tại số điện thoại này!');
      }
    }
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
}
