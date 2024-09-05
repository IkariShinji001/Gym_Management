import { Injectable } from '@nestjs/common';
import { IMaintenanacesService } from '../interfaces/maintenances.service.interface';
import { Maintenances } from '../repositories/maintenances.entity';
import {
  CreateMaintenanceDto,
  UpdateMaintenanceDto,
} from '../dtos/maintenances.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacilitiesService } from './facilities.service';

@Injectable()
export class MaintenancesService implements IMaintenanacesService {
  constructor(
    @InjectRepository(Maintenances)
    private maintenancesRepository: Repository<Maintenances>,
    private facilityService: FacilitiesService,
  ) {}
  async maintenanceHistory(id: number): Promise<Maintenances[]> {
    return await this.maintenancesRepository
      .createQueryBuilder('m')
      .leftJoinAndSelect('m.facility', 'f')
      .where('f.id=:id', { id })
      .andWhere('m.isFinished= TRUE')
      .getMany();
  }

  async create(newMaintenance: CreateMaintenanceDto): Promise<Maintenances[]> {
    const maintenanceArray: Maintenances[] = [];
    for (const facilityId of newMaintenance.facilityIds) {
      const existedFacility = await this.facilityService.findOne(facilityId);
      const maintenance = await this.maintenancesRepository.create({
        ...newMaintenance,
        facility: existedFacility,
      });
      await this.maintenancesRepository.save(maintenance);
      maintenanceArray.push(maintenance);
    }
    return maintenanceArray;
  }

  async update(
    id: number,
    updateMaintenance: UpdateMaintenanceDto,
  ): Promise<Maintenances> {
    const facilityId = updateMaintenance.facilityIds[0];
    const maintenanceToUpdate = {
      facilityId: facilityId,
      date: updateMaintenance.date,
      description: updateMaintenance.description,
      isFinished: updateMaintenance.isFinished,
    };
    console.log(maintenanceToUpdate);
    await this.maintenancesRepository.update(id, maintenanceToUpdate);
    return this.maintenancesRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    const maintenance = await this.maintenancesRepository.findOne({
      where: { id },
    });
    await this.maintenancesRepository.delete(maintenance);
  }

  async findAll(): Promise<Maintenances[]> {
    return await this.maintenancesRepository.find({ relations: ['facility'] });
  }
}
