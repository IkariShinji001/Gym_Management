import { CreatePackageBenefitsDto } from "../dtos/benefitPackage.dto";
import { PackageBenefits } from "../repositories/packageBenefit.entity";

export interface IBenefitPackageService{
    findAll(): Promise<PackageBenefits[]> 
    create(createBenefitDto :CreatePackageBenefitsDto): Promise<PackageBenefits>
    createList(createBenefitDtoList :CreatePackageBenefitsDto[]): Promise<PackageBenefits[]>
}