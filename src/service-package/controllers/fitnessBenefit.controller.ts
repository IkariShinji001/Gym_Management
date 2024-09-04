import { Controller, Get } from "@nestjs/common";
import { FitnessBenefitService } from "../services/fitnessBenefit.service";
import { FitnessBenefits } from "../repositories/fitnessBenefit.entity";

@Controller("/fitness-benefits")
export class FitnessBenefitsController{

    constructor(
        private fitnessBenefitService: FitnessBenefitService
    ){}

    @Get()
    async findAll(): Promise<FitnessBenefits[]> {
        return await this.fitnessBenefitService.findAll()
    }


}