import { Facilities } from '../repositories/facilities.entity';
import { FacilitiesService } from '../services/facilities.service';
import { Controller, Get, Post } from '@nestjs/common';

@Controller('/facilities')
export class FacilitiesController {
  constructor(private facilitiesService: FacilitiesService) {}

  @Get()
  async findAll(): Promise<Facilities[]> {
    return await this.facilitiesService.findAll();
  }
  @Post()
  async Create(): Promise<Facilities> {
    return await this.facilitiesService.create();
  }
  

}
