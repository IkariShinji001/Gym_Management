import { CreateSProductTypeDto, UpdateSProductTypeDto } from "../dtos/sProductType.dto";
import { SupplementProduct } from "../repositories/supplementProduct.entity";
import { SProductType } from "../repositories/sProductType.entity";

export interface ISProductTypeService {
    findAll(): Promise<SProductType[]>;
    create(createSProductTypeDto: CreateSProductTypeDto) : Promise<SProductType> 
    update(id:number, updateSProductDto: UpdateSProductTypeDto) :Promise<SProductType>
    delete(id:number): Promise<void>
}