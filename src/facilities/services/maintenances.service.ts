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

  async create(newMaintenance: CreateMaintenanceDto): Promise<Maintenances> {
    const existedFacility = await this.facilityService.findOne(
      newMaintenance.facilityId,
    );
    const maintenance = this.maintenancesRepository.create({
      ...newMaintenance,
      facility: existedFacility,
    });
    return await this.maintenancesRepository.save(maintenance);
  }

  async update(
    id: number,
    updateMaintenance: UpdateMaintenanceDto,
  ): Promise<Maintenances> {
    await this.maintenancesRepository.update(id, {
      date: updateMaintenance.date,
      description: updateMaintenance.description,
      isFinished: updateMaintenance.isFinished,
    });
    return this.maintenancesRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    const maintenance = await this.maintenancesRepository.findOne({
      where: { id },
    });
    await this.maintenancesRepository.delete(maintenance);
  }

  async findAll(): Promise<Maintenances[]> {
    return await this.maintenancesRepository.find();
  }
}
