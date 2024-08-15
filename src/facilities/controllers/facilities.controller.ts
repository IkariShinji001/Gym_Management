import { Facilities } from '../repositories/facilities.entity';
import { FacilitiesService } from '../services/facilities.service';
import { Controller, Get } from '@nestjs/common';

@Controller('/facilities')
export class FacilitiesController {
  constructor(private facilitiesService: FacilitiesService) {}

  @Get()
  getFacilities(): Promise<Facilities[]> {
    return this.facilitiesService.findAll();
  }
}
