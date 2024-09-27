import { IsDate } from "class-validator";

export class RevenueByDayFromBillsDto {
    @IsDate()
    startDate: Date;

    @IsDate()
    endDate: Date;
}