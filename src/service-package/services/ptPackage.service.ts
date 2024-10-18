import { HttpException, Injectable } from '@nestjs/common';
import {
  CreateAllPtPackagesDto,
  UpdateAllPtPackageDto,
} from '../dtos/allPtPackage.dto';
import { IPtPackageService } from '../interfaces/ptPackage.service.interface';
import { PtPackages } from '../repositories/ptPackage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PtService } from 'src/admin/services/pt.services';
import { ServicePackagesService } from './servicePackage.service';
import { ServicePackagePriceService } from './servicePackagePrice.service';

@Injectable()
export class PtPackagesService implements IPtPackageService {
  constructor(
    @InjectRepository(PtPackages)
    private ptPackageRepository: Repository<PtPackages>,
    private servicePackageService: ServicePackagesService,
    private packagePriceService: ServicePackagePriceService,
    private ptSerivce: PtService,
  ) {}

  async find(): Promise<PtPackages[]> {
    return await this.ptPackageRepository.find({
      relations: ['servicePackage', 'pt'],
    });
  }
  async getAll(): Promise<PtPackages[]> {
    const ptPackages = await this.ptPackageRepository
      .createQueryBuilder('ptPackage')
      .leftJoinAndSelect('ptPackage.pt', 'pt')
      .leftJoinAndSelect('pt.profile', 'profile')
      .leftJoinAndSelect('pt.images', 'ptImages')
      .leftJoinAndSelect('ptPackage.servicePackage', 'servicePackage')
      .leftJoinAndSelect(
        'servicePackage.servicePackagePrices',
        'servicePackagePrice',
      )
      .leftJoinAndSelect(
        'servicePackagePrice.packageDuration',
        'packageDuration',
      )
      .getMany();

    return ptPackages;
  }
  async getById(id: number): Promise<PtPackages> {
    const ptPackage = await this.ptPackageRepository
      .createQueryBuilder('ptPackage')
      .leftJoinAndSelect('ptPackage.pt', 'pt')
      .leftJoinAndSelect('pt.profile', 'profile')
      .leftJoinAndSelect('pt.images', 'ptImages')
      .leftJoinAndSelect('ptPackage.servicePackage', 'servicePackage')
      .leftJoinAndSelect(
        'servicePackage.servicePackagePrices',
        'servicePackagePrice',
      )
      .leftJoinAndSelect('servicePackage.serviceType', 'serviceType')
      .leftJoinAndSelect(
        'servicePackagePrice.packageDuration',
        'packageDuration',
      )
      .where('ptPackage.id = :id', { id })
      .getOne();

    return ptPackage;
  }
  async getAllPPDetail() {
    const ptPackages = await this.ptPackageRepository
      .createQueryBuilder('ptPackage')
      .leftJoinAndSelect('ptPackage.pt', 'pt')
      .leftJoinAndSelect('pt.profile', 'profile')
      .leftJoinAndSelect('pt.images', 'ptImages')
      .leftJoinAndSelect('ptPackage.servicePackage', 'servicePackage')
      .leftJoinAndSelect(
        'servicePackage.servicePackagePrices',
        'servicePackagePrice',
      )
      .leftJoinAndSelect('servicePackage.serviceType', 'serviceType')
      .leftJoinAndSelect(
        'servicePackagePrice.packageDuration',
        'packageDuration',
      )
      .getMany();

    return ptPackages;
  }
  // ========== Create ==========
  async create(createAllPPDto: CreateAllPtPackagesDto): Promise<PtPackages> {
    const {
      createPtPackageDto,
      createServicePackageDto,
      createPackagePriceDtoList,
    } = createAllPPDto;

    const savedSP = await this.servicePackageService.create(
      createServicePackageDto,
    );
    const existedPt = await this.ptSerivce.findOne(createPtPackageDto.ptId);
    if (!existedPt) {
      console.log(`Pt with ID: ${createPtPackageDto.ptId} not found`);
      throw new HttpException(
        `Pt with ID: ${createPtPackageDto.ptId} not found`,
        400,
      );
    }

    const createdPP = this.ptPackageRepository.create({
      ...createPtPackageDto,
      servicePackage: savedSP,
      pt: existedPt,
    });

    if (createPackagePriceDtoList) {
      for (var i = 0; i < createPackagePriceDtoList.length; i++) {
        await this.packagePriceService.createPackagePrice(
          createPackagePriceDtoList[i],
          savedSP,
        );
      }
    }

    const savedPP = await this.ptPackageRepository.save(createdPP);

    return this.getById(savedPP.id);
  }

  // ========== UPDATE ==========
  async updatePP(
    ptPackageId: number,
    updateAllPPDto: UpdateAllPtPackageDto,
  ): Promise<PtPackages> {
    const {
      updatePtPackageDto,
      updateServicePackageDto,
      updatePackagePriceDtoList,
    } = updateAllPPDto;

    const updatedSP = await this.servicePackageService.update(
      updatePtPackageDto.servicePackageId,
      updateServicePackageDto,
    );

    const existedPP = await this.ptPackageRepository.findOne({
      where: { id: ptPackageId },
      relations: ['servicePackage', 'pt'],
    });

    if (!existedPP) {
      console.log(`Pt Package with ID: ${ptPackageId} not found`);
      throw new HttpException(
        `Pt Package with ID: ${ptPackageId} not found`,
        400,
      );
    }

    const existedPt = await this.ptSerivce.findOne(updatePtPackageDto.ptId);
    if (!existedPt) {
      console.log(`Pt with ID: ${updatePtPackageDto.ptId} not found`);
      throw new HttpException(
        `Pt with ID: ${updatePtPackageDto.ptId} not found`,
        400,
      );
    }

    Object.assign(existedPP, updatePtPackageDto);

    const savedPP = await this.ptPackageRepository.save({
      ...existedPP,
      servicePackage: updatedSP,
      pt: existedPt,
    });

    if (updatePackagePriceDtoList) {
      for (var i = 0; i < updatePackagePriceDtoList.length; i++) {
        await this.packagePriceService.updatePackagePrice(
          updatePackagePriceDtoList[i].priceId,
          updatePackagePriceDtoList[i],
          updatedSP,
        );
      }
    }

    return this.getById(savedPP.id); ;
  }
  async delete(PPId: number): Promise<void> {
    await this.ptPackageRepository.delete(PPId);
  }
}
