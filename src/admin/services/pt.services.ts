import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pt } from '../repositories/pt.entity';
import { CreatePtDto, UpdatePtDto } from '../dtos/pt.dto';
import { Profile } from '../repositories/profile.entity';
import { ProfileService } from './profile.services';
import { CreateProfileDto } from '../dtos/profile.dto';

Injectable();
export class PtService {
  constructor(
    @InjectRepository(Pt)
    private ptRepository: Repository<Pt>,
    private profileService: ProfileService,
  ) {}

  async findAll(): Promise<Pt[]> {
    return await this.ptRepository.find({
      relations: ['profile', 'images'],
    });
  }
  async findOne(id: number): Promise<Pt> {
    return await this.ptRepository.findOne({
      where: { id },
    });
  }
  async create(newProfile: CreateProfileDto, ptInfo: CreatePtDto): Promise<Pt> {
    const createdProfile = await this.profileService.create(newProfile);
    const ceratedPt = this.ptRepository.create({
      ...ptInfo,
      profile: createdProfile,
    });
    return await this.ptRepository.save(ceratedPt);
  }
  async update(id: number, updatePt: UpdatePtDto): Promise<Pt> {
    await this.ptRepository.update(id, updatePt);
    return this.ptRepository.findOne({ where: { id } });
  }
  async delete(id: number): Promise<void> {
    const deletedPt = await this.ptRepository.findOne({
      where: { id },
    });
    await this.ptRepository.delete(deletedPt);
  }
}
