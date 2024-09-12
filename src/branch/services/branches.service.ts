import { Injectable } from '@nestjs/common';
import { IBranchService } from '../interfaces/branches.service.interface';
import { CreateBranchDto, UpdateBrachDto } from '../dtos/branches.dto';
import { Branches } from '../repositories/branches.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DistrictsService } from '../services/districts.service';

@Injectable()
export class BranchesService implements IBranchService {
  constructor(
    @InjectRepository(Branches)
    private branchesRepository: Repository<Branches>,
    private districtsService: DistrictsService,
  ) {}
  async findAll(): Promise<Branches[]> {
    // return await this.branchesRepository.find({relations: ['district']});
    const branchs = this.branchesRepository
      .createQueryBuilder('branch')
      .leftJoinAndSelect('branch.district', 'district')
      .leftJoinAndSelect('district.province', 'province')
      .getMany();
    return branchs;
  }
  async findOne(id: number): Promise<Branches> {
    return await this.branchesRepository.findOne({ where: { id: id } });
  }

  async findDetailById(id: number): Promise<Branches> {
    const branch = this.branchesRepository
      .createQueryBuilder('branch')
      .leftJoinAndSelect('branch.district', 'district')
      .leftJoinAndSelect('district.province', 'province')
      .where('branch.id = :id', { id })
      .getOne();
    return branch;
  }
  async create(newBranch: CreateBranchDto): Promise<Branches> {
    const existedDistrict = await this.districtsService.findOne(
      newBranch.districtId,
    );
    const branch = this.branchesRepository.create({
      ...newBranch,
      district: existedDistrict,
    });
    const savedBranch = await this.branchesRepository.save(branch);

    return await this.findDetailById(savedBranch.id);
  }
  async update(id: number, updateBranch: UpdateBrachDto): Promise<Branches> {
    console.log(updateBranch);
    // Lấy dữ liệu gốc của chi nhánh
    const originalBranch = await this.branchesRepository.findOne({
      where: { id },
    });

    if (!originalBranch) {
      throw new Error('Branch not found');
    }

    // Hàm để lấy ra các thuộc tính đã thay đổi
    const getChangedProperties = (original, updated) => {
      return Object.keys(updated).reduce((changes, key) => {
        // So sánh từng thuộc tính, chỉ lấy các thuộc tính thay đổi
        if (updated[key] !== undefined && original[key] !== updated[key]) {
          changes[key] = updated[key];
        }
        return changes;
      }, {});
    };

    // Lấy các thuộc tính đã thay đổi
    const changes = getChangedProperties(originalBranch, updateBranch);

    console.log(changes);

    // Nếu không có thay đổi, thoát ra sớm
    if (Object.keys(changes).length === 0) {
      console.log('Không có thuộc tính nào thay đổi.');
      return originalBranch;
    }

    // Cập nhật chỉ với các thuộc tính thay đổi
    await this.branchesRepository.update(id, changes);
    return await this.findDetailById(id);
  }
  async delete(id: number): Promise<void> {
    const branch = await this.branchesRepository.findOne({ where: { id } });
    await this.branchesRepository.delete(branch);
  }

  async findBranchInProvince(provinceId: number): Promise<Branches[]> {
    const branches = await this.branchesRepository
      .createQueryBuilder('branch')
      .leftJoinAndSelect('branch.district', 'district')
      .leftJoinAndSelect('district.province', 'province')
      .where('district.provinceId = :provinceId', {provinceId})
      .getMany();
    return branches;
  }
}
