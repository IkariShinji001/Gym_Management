import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from '../repositories/employee.entity';
import { Repository } from 'typeorm';
import { IEmployeeService } from '../interfaces/employee.service.interface';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dtos/employee.dto';
import { CreateProfileDto } from '../dtos/profile.dto';
import { ProfileService } from './profile.services';
import { ManagerService } from './manager.services';

@Injectable()
export class EmployeeService implements IEmployeeService {
  constructor(
    @InjectRepository(Employees)
    private employeeRepository: Repository<Employees>,
    private profileService: ProfileService,
    private managerService: ManagerService,
  ) {}

  async findAll(): Promise<Employees[]> {
    return await this.employeeRepository.find({
      relations: ['profile', 'manager'],
    });
  }

  async findOne(id: number): Promise<Employees> {
    return await this.employeeRepository.findOne({
      where: { id },
      relations: ['profile', 'manager'],
    });
  }

  async create(
    newProfile: CreateProfileDto,
    newEmployee: CreateEmployeeDto,
  ): Promise<Employees> {
    // Kiểm tra xem email đã tồn tại chưa
    const existingEmail = await this.profileService.findOneByEmail({
      email: newProfile.email,
    });
    if (existingEmail) {
      throw new BadRequestException('Đã tồn tại email này!');
    }
    const createdProfile = await this.profileService.create(newProfile);
    const manager = await this.managerService.findOne(newEmployee.managerId);
    const createdEmployee = this.employeeRepository.create({
      ...newEmployee,
      profile: createdProfile,
      manager,
    });
    return await this.employeeRepository.save(createdEmployee);
  }

  async update(
    id: number,
    updateEmployee: UpdateEmployeeDto,
  ): Promise<Employees> {
    const res=    await this.employeeRepository.update(id, updateEmployee);
    console.log(res);
    return this.employeeRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    const deletedEmployee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    await this.employeeRepository.delete(deletedEmployee);
    await this.profileService.delete(deletedEmployee.profile.id);
  }
}
