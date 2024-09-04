import { Injectable } from '@nestjs/common';
import { PtImages } from '../repositories/ptImages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPtImagesService } from '../interfaces/ptImages.service.interface';
import { PtService } from './pt.services';

Injectable();
export class PtImagesService implements IPtImagesService {
  constructor(
    @InjectRepository(PtImages)
    private ptImagesRepository: Repository<PtImages>,
    private PtService: PtService,
  ) {}

  async findAll(): Promise<PtImages[]> {
    return await this.ptImagesRepository.find({
      relations: ['pt'],
    }); 
  }
 
  async addImage(imageUrl: string, idPt: number): Promise<PtImages> {
    const existedPt = await this.PtService.findOne(idPt);
    if (!existedPt) {
      throw new Error('Pt not found');
    }
    console.log(imageUrl);
    const newIm = this.ptImagesRepository.create({
      imageUrl: imageUrl,
      pt: existedPt,
    });
    return await this.ptImagesRepository.save(newIm);
  }

  async delete(id: number): Promise<void> {
    await this.ptImagesRepository.delete(id);
    return;
  }
}
