import { CreateBranchDto, UpdateBrachDto } from '../dtos/branches.dto';
import {Branches} from '../repositories/branches.entity'

export interface IBranchService {
    findAll(): Promise<Branches[]>;
    findById(id: number): Promise<Branches>;
    create(newBranch: CreateBranchDto): Promise<Branches>;
    update(id: number, updateBranch: UpdateBrachDto): Promise<Branches>;
    delete(id: number): Promise<void>;
}