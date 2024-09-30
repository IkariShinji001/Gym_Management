import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Facilities } from '../repositories/facilities.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IFacilitiesService } from '../interfaces/facilities.service.interface';
import { CreateFacilityDto, updateFacilityDto } from '../dtos/facilities.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { BranchServiceClient } from 'src/shared/interfaces/grpc/branch/branchServiceClient.interface';
import { BranchId } from 'src/shared/interfaces/grpc/branch/branchService.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FacilitiesService implements IFacilitiesService, OnModuleInit {
  private branchService: BranchServiceClient;

  constructor(
    @Inject('SERVER') private client: ClientGrpc,
    @InjectRepository(Facilities)
    private facilitiesRepository: Repository<Facilities>,
  ) {}
  onModuleInit() {
    this.branchService =
      this.client.getService<BranchServiceClient>('BranchService');
  }

  async findAll(): Promise<Facilities[]> {
    return await this.facilitiesRepository.find();
  }

  async findNameBranchById(branchId: BranchId) {
    return this.branchService.findBranchById(branchId);
  }

  async create(newFacility: CreateFacilityDto): Promise<Facilities> {
    const facility = this.facilitiesRepository.create(newFacility);
    console.log(facility);
    const branchId = {
      id: facility.branchId,
    };
    const nameBranch = await firstValueFrom(
      await this.findNameBranchById(branchId),
    );
    console.log(facility);
    console.log(nameBranch);
    const facilityNew = {
      ...facility,
      nameBranch: nameBranch.name,
    };
    console.log(facilityNew);
    return await this.facilitiesRepository.save(facilityNew);
  }

  async deleteFacilitiesByBranchId(id: number) {
    console.log(id);
    const facilities = await this.facilitiesRepository.find({
      where: { branchId: id },
    });
    console.log(facilities);
    for (const facility of facilities) {
      await this.facilitiesRepository.delete(facility);
    }
    return { msg: 'Xóa thành công' };
  }

  async update(
    id: number,
    updateFacility: updateFacilityDto,
  ): Promise<Facilities> {
    await this.facilitiesRepository.update(id, updateFacility);
    return this.facilitiesRepository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<Facilities[]> {
    const facilities = await this.facilitiesRepository.find({
      where: {
        name: Like(`%${name}%`), // Sử dụng toán tử ilike để tìm kiếm không phân biệt chữ hoa thường
      },
    });
    return facilities;
  }

  async findFacilitiesByBranchId(id: number): Promise<Facilities[]> {
    console.log(id);
    const facilities = this.facilitiesRepository.find({
      where: { branchId: id },
    });
    return facilities;
  }

  async findById(id: number): Promise<Facilities> {
    const facility = await this.facilitiesRepository.findOne({ where: { id } });
    return facility;
  }

  async findFacilityIsFinishedTrue(): Promise<Facilities[]> {
    let data = await this.facilitiesRepository
      .createQueryBuilder('facility')
      .leftJoinAndSelect('facility.maintenances', 'maintenance')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('1')
          .from('maintenances', 'm')
          .where('m.facilityId = facility.id')
          .andWhere('m.isFinished = false')
          .getQuery();
        return `NOT EXISTS (${subQuery})`;
      })
      .getMany();

    console.log(data);

    if (data.length === 0) {
      data = await this.facilitiesRepository.find();
    }
    return data;
  }

  async checkFacilityIsFinishedIsFalse(id: number): Promise<Facilities> {
    const facility = await this.facilitiesRepository
      .createQueryBuilder('f')
      .leftJoinAndSelect('f.maintenances', 'm') // Kết nối bảng maintenances với facilities
      .where('f.id = :id', { id }) // Điều kiện lọc facility theo ID
      .andWhere('m.isFinished = FALSE') // Điều kiện isFinished phải bằng false
      .getOne(); // Lấy một facility có id tương ứng
    // Nếu tìm thấy facility phù hợp, trả về nó
    return facility || null; // Nếu không tìm thấy, trả về null
  }

  async delete(id: number): Promise<void> {
    const facility = await this.facilitiesRepository.findOne({ where: { id } });
    await this.facilitiesRepository.delete(facility);
  }
}
