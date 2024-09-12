import { CreateDistrictDto, UpdateDistrictDto } from "../dtos/districts.dto";
import { Districts } from "../repositories/districts.entity";

export interface IDistrictService {
    findAll(): Promise<Districts[]>
    findOne(id: number): Promise<Districts> 
    create(district: CreateDistrictDto): Promise<Districts>
    update(id: number, district: UpdateDistrictDto): Promise<Districts>
    delete(id: number): Promise<void>
}