import { CreateBranchDto } from "../dtos/branches.dto";
import { UpdateDistrictDto } from "../dtos/districts.dto";
import { Districts } from "../repositories/districts.entity";

export interface IDistrictService {
    findAll(): Promise<Districts[]>
    findOne(id: number): Promise<Districts> 
    create(district: CreateBranchDto): Promise<Districts>
    update(id: number, district: UpdateDistrictDto): Promise<Districts>
    delete(id: number): Promise<void>
}