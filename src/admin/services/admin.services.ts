import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { IAdminService } from '../interfaces/admin.service.interface';
import { CreateAdminDto, updateAdminDto } from '../dtos/admin.dto';
import { Admin } from '../repositories/admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService implements IAdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  findOneByEmail(data: { email: string }): Promise<Admin> {
    return this.adminRepository.findOneByOrFail({ email: data.email });
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminRepository.find();
  }
  async findOne(id: number): Promise<Admin> {
    return await this.adminRepository.findOne({ where: { id } });
  }
  async create(newAdmin: CreateAdminDto): Promise<Admin> {
    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newAdmin.password, salt);

    newAdmin.password = hashedPassword;

    const createdAdmin = this.adminRepository.create(newAdmin);
    return await this.adminRepository.save(createdAdmin);
  }
  async update(id: number, updateAdmin: updateAdminDto): Promise<Admin> {
    await this.adminRepository.update(id, updateAdmin);
    return this.adminRepository.findOne({ where: { id } });
  }
  async delete(id: number): Promise<void> {
    const deletedAdmin = await this.adminRepository.findOne({ where: { id } });
    await this.adminRepository.delete(deletedAdmin);
  }
  async findByPhoneNumber(phoneNumber: string): Promise<Admin[]> {
    const admins = await this.adminRepository.find({
      where: {
        phoneNumber: Like(`%${phoneNumber}%`),
      },
    });
    return admins;
  }
}
