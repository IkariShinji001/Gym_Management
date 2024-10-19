import { CreateProvinceDto, UpdateProvinceDto } from "../dtos/provinces.dto";
import { Provinces } from "../repositories/provinces.entity";


export interface IProvinceService {
    findAll(): Promise<Provinces[]>
    findOne(id: number): Promise<Provinces>
    create(province: CreateProvinceDto): Promise<Provinces>
    update(id: number, updateProvince: UpdateProvinceDto): Promise<Provinces>
    delete(id: number): Promise<void>
}