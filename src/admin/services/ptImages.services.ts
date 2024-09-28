import { Injectable } from '@nestjs/common';
import { IPtImagesService } from '../interfaces/ptImages.service.interface';
import { PtImages } from '../repositories/ptImages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pt } from '../repositories/pt.entity';

@Injectable()
export class PtImagesService implements IPtImagesService {
  constructor(
    @InjectRepository(PtImages)
    private ptImagesRepository: Repository<PtImages>,

    @InjectRepository(Pt)
    private ptRepository: Repository<Pt>,
  ) {}

  async findAll(): Promise<PtImages[]> {
    return await this.ptImagesRepository.find({
      relations: ['pt'],
    });
  }

  async addImage(imageUrl: string, idPt: number): Promise<PtImages> {
    const existedPt = await this.ptRepository.findOne({ where: { id: idPt } });
    if (!existedPt) {
      throw new Error('Pt not found');
    }
    const newIm = this.ptImagesRepository.create({
      imageUrl: imageUrl,
      pt: existedPt,
    });
    return await this.ptImagesRepository.save(newIm);
  }

  async delete(id: number): Promise<void> {
    await this.ptImagesRepository.delete(id);
  }
}
