import { Inject, Injectable } from '@nestjs/common';
import { Facilities } from '../repositories/facilities.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectRepository(Facilities)
    private facilitiesRepository: Repository<Facilities>,
  ) {}

  async findAll() {
    return await this.facilitiesRepository.find();
  }
}
