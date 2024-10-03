import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pt } from '../repositories/pt.entity';
import { CreatePtDto, UpdatePtDto } from '../dtos/pt.dto';
import { Profile } from '../repositories/profile.entity';
import { ProfileService } from './profile.services';
import { CreateProfileDto } from '../dtos/profile.dto';
import { IPtService } from '../interfaces/pt.service.interface';
import { createImagesDto } from '../dtos/createImages.dto';
import { PtImagesService } from './ptImages.services';
import { ManagerService } from './manager.services';

@Injectable()
export class PtService implements IPtService {
  constructor(
    @InjectRepository(Pt)
    private ptRepository: Repository<Pt>,
    private profileService: ProfileService,
    private imageService: PtImagesService,
    private managerService: ManagerService,
  ) {}

  async findAll(): Promise<Pt[]> {
    return await this.ptRepository.find({
      relations: ['profile', 'images'],
    });
  }
  async findOne(id: number): Promise<Pt> {
    return await this.ptRepository.findOne({
      where: { id },
      relations: ['images', 'profile'],
    });
  }
  async findByProfileId(id: number): Promise<Pt> {
    return await this.ptRepository.findOne({
      where: { profile: { id } },
      relations: ['images', 'profile'],
    });
  }
  async create(
    newProfile: CreateProfileDto,
    newPt: CreatePtDto,
    imageDtoList: createImagesDto[],
  ): Promise<Pt> {
    const createdProfile = await this.profileService.create(newProfile);
    const manager = await this.managerService.findOne(newPt.managerId);
    const ceratedPt = this.ptRepository.create({
      ...newPt,
      profile: createdProfile,
      manager,
    });
    const savedPt = await this.ptRepository.save(ceratedPt);
    for (const imageDto of imageDtoList) {
      const image = await this.imageService.addImage(
        imageDto.imageUrl,
        savedPt.id,
      );
    }
    return savedPt;
  }
  async update(id: number, updatePt: UpdatePtDto): Promise<Pt> {
    await this.ptRepository.update(id, updatePt);
    return this.ptRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    const pt = await this.ptRepository.findOne({
      where: { id },
      relations: ['images', 'profile'],
    });

    if (!pt) {
      throw new Error('Pt not found');
    }

    // xoá các ảnh liên quan
    for (const image of pt.images) {
      await this.imageService.delete(image.id);
    }
    // XOá profile
    await this.profileService.delete(pt.profile.id);
    // xoá entity pt
    await this.ptRepository.remove(pt);
  }
}
