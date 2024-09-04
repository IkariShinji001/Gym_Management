import { CreateSoldProductDto } from "../dtos/soldProduct.dto";
import { SoldProduct } from "../repositories/soldProduct.entity";

export interface ISoldProductService {
    findAll(): Promise<SoldProduct[]>;
    create(newSoldProduct :CreateSoldProductDto): Promise<SoldProduct>;
    delete(id: number): Promise<void>;
    
}