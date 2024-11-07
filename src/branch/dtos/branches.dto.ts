import { PartialType } from '@nestjs/mapped-types';
import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsDefined({ message: 'Địa chỉ không được null.' }) // Kiểm tra không phải null hoặc undefined
  @IsNotEmpty({ message: 'Tên địa chỉ là bắt buộc.' })
  address: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  openTime: string;

  @IsString()
  closedTime: string;

  @IsNumber()
  districtId: number;
}

export class UpdateBrachDto extends PartialType(CreateBranchDto) {}
