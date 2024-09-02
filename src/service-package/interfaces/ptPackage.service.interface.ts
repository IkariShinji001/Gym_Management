import { CreateAllPtPackagesDto, UpdateAllPtPackageDto } from '../dtos/allPtPackage.dto';
import { PtPackages } from '../repositories/ptPackage.entity';

export interface IPtPackageService {
  find(): Promise<PtPackages[]>;
  create(createAllPPDto: CreateAllPtPackagesDto): Promise<PtPackages>;
  updatePP(
    ptPackageId: number,
    updateAllPPDto: UpdateAllPtPackageDto,
  ): Promise<PtPackages>;
  delete(id: number): Promise<void>;
}
