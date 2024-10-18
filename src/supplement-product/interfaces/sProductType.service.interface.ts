import { CreateSProductTypeDto, UpdateSProductTypeDto } from "../dtos/sProductType.dto";
import { SupplementProduct } from "../repositories/supplementProduct.entity";
import { SupplementProductType } from "../repositories/sProductType.entity";

export interface ISProductTypeService {
    findAll(): Promise<SupplementProductType[]>;
    create(createSProductTypeDto: CreateSProductTypeDto) : Promise<SupplementProductType> 
    update(id:number, updateSProductDto: UpdateSProductTypeDto) :Promise<SupplementProductType>
    delete(id:number): Promise<void>
}