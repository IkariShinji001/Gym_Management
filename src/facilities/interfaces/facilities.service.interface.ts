import { Facilities } from '../repositories/facilities.entity';
import { CreateFacilityDto, updateFacilityDto } from '../dtos/facilities.dto';

export interface IFacilitiesService {
  findAll(): Promise<Facilities[]>;
  findById(id: number): Promise<Facilities>;
  create(newFacility: CreateFacilityDto): Promise<Facilities>;
  update(id: number, updateFacility: updateFacilityDto): Promise<Facilities>;
  delete(id: number): Promise<void>;
  findByName(name: string): Promise<Facilities[]>;
}

export interface userName {
  name: string;
}
