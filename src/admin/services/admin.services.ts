import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IAdminService } from "../interfaces/admin.service.interface";
import { CreateAdminDto, updateAdminDto } from "../dtos/admin.dto";
import { Admin } from "../repositories/admin.entity";

@Injectable()
export class AdminService implements IAdminService{
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}
    async findOne(id: number): Promise<Admin> {
        return await this.adminRepository.findOne({ where: { id } });
    }
    async create(newAdmin: CreateAdminDto): Promise<Admin> {
        const createdAdmin = this.adminRepository.create(newAdmin);
        return await this.adminRepository.save(createdAdmin);
    }
    update(id: number, updateAdmin: updateAdminDto): Promise<Admin> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findByPhoneNumber(phoneNumber: string): Promise<Admin[]> {
        throw new Error("Method not implemented.");
    }
    async findAll() {
        return await this.adminRepository.find();
    }
}