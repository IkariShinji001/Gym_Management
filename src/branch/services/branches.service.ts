import { Injectable } from '@nestjs/common';
import { IBranchService } from '../interfaces/branches.service.interface';
import { CreateBranchDto, UpdateBrachDto } from '../dtos/branches.dto';
import { Branches } from '../repositories/branches.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BranchesService implements IBranchService {
  constructor(
    @InjectRepository(Branches)
    private branchesRepository: Repository<Branches>,
  ) {}

  async findAll(): Promise<Branches[]> {
    return await this.branchesRepository.find();
  }
  async findOne(id: number): Promise<Branches> {
    return await this.branchesRepository.findOne({ where: { id: id } });
  }
  async create(newBranch: CreateBranchDto): Promise<Branches> {
    const branch = this.branchesRepository.create(newBranch);
    return await this.branchesRepository.save(branch);
  }
  async update(id: number, updateBranch: UpdateBrachDto): Promise<Branches> {
    await this.branchesRepository.update(id, updateBranch);
    return this.branchesRepository.findOne({ where: { id } });
  }
  async delete(id: number): Promise<void> {
    const branch = await this.branchesRepository.findOne({ where: { id } });
    await this.branchesRepository.delete(branch);
  }
}
