import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Managers } from '../repositories/manager.entity';
import { IManagerService } from '../interfaces/manager.service.interface';
import { CreateProfileDto } from '../dtos/profile.dto';
import { Employees } from '../repositories/employee.entity';
import { ProfileService } from './profile.services';
import { Pt } from '../repositories/pt.entity';
import { PtImages } from '../repositories/ptImages.entity';

Injectable();
export class ManagerService implements IManagerService {
  constructor(
    @InjectRepository(Managers)
    private managerRepository: Repository<Managers>,
    private profileService: ProfileService,

  ) {}
  async findAll(): Promise<Managers[]> {
    return await this.managerRepository.find({
      relations: ['profile'],
    });
  }
  async findOne(id: number): Promise<Managers> {
    return await this.managerRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
  }
  async findByProfileId(id: number): Promise<Managers> {
    return await this.managerRepository.findOne({
      where: { profile: { id } },
      relations: ['profile'],
    });
  }
  async create(newProfile: CreateProfileDto): Promise<Managers> {
    const existingEmail = await this.profileService.findOneByEmail({
      email: newProfile.email,
    });
    if (existingEmail) {
      throw new BadRequestException('Đã tồn tại email này!');
    }
    const createdProfile = await this.profileService.create(newProfile);
    const createdManager = this.managerRepository.create({
      profile: createdProfile,
    });
    return await this.managerRepository.save(createdManager);
  }
  // async update(id: number, updateManager: Managers): Promise<Managers> {
  //     await this.managerRepository.update(id, updateManager);
  //     return this.managerRepository.findOne({ where: { id } });
  // }
  async delete(id: number): Promise<void> {
    const deletedManager = await this.managerRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    await this.managerRepository.delete(deletedManager);
    await this.profileService.delete(deletedManager.profile.id);
  }
  async FindAllEmployeesByManagerId(id: number): Promise<Employees[]> {
    const manager = await this.managerRepository.findOne({
      where: { id },
      relations: ['employees', 'employees.profile'],
    });
    return manager.employees;
  }
  async FindAllPtsByManagerId(id: number): Promise<Pt[]> {
    const manager = await this.managerRepository.findOne({
      where: { id },
      relations: ['pt', 'pt.profile', 'pt.images'],
    });
    return manager.pt;
  }
}
