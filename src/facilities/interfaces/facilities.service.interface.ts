import { Facilities } from '../repositories/facilities.entity';
import { CreateFacilityDto, updateFacilityDto } from '../dtos/facilities.dto';

export interface IFacilitiesService {
  findAll(): Promise<Facilities[]>;
  findOne(id: number): Promise<Facilities>;
  create(newFacility: CreateFacilityDto): Promise<Facilities>;
  update(id: number, updateFacility: updateFacilityDto): Promise<Facilities>;
  delete(id: number): Promise<void>;
  findByName(name: string): Promise<Facilities[]>;
}
