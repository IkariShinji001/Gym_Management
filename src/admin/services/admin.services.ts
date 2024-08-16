import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { IAdminService } from '../interfaces/admin.service.interface';
import { CreateAdminDto, updateAdminDto } from '../dtos/admin.dto';
import { Admin } from '../repositories/admin.entity';

@Injectable()
export class AdminService implements IAdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  findOneByEmail(data: { email: string }): Promise<Admin> {
    return this.adminRepository.findOneByOrFail({ email: data.email });
  }

  login(email: string, password: string): Promise<{ access_token: string }> {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<Admin[]> {
    return await this.adminRepository.find();
  }
  async findOne(id: number): Promise<Admin> {
    return await this.adminRepository.findOne({ where: { id } });
  }
  async create(newAdmin: CreateAdminDto): Promise<Admin> {
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
