import { Injectable } from '@nestjs/common';
import { Facilities } from '../repositories/facilities.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IFacilitiesService } from '../interfaces/facilities.service.interface';
import { CreateFacilityDto, updateFacilityDto } from '../dtos/facilities.dto';

@Injectable()
export class FacilitiesService implements IFacilitiesService {
  constructor(
    @InjectRepository(Facilities)
    private facilitiesRepository: Repository<Facilities>,
  ) {}

  async findAll(): Promise<Facilities[]> {
    return await this.facilitiesRepository.find();
  }

  async create(newFacility: CreateFacilityDto): Promise<Facilities> {
    const facility = this.facilitiesRepository.create(newFacility);
    return await this.facilitiesRepository.save(facility);
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
