import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './profile.dto';
import { CreatePtDto } from './pt.dto';
import { createImagesDto } from './createImages.dto';

export class CreatePtProfileDto {
    createProfileDto: CreateProfileDto;
    createPtDto: CreatePtDto;
    createImagesDto: createImagesDto[];
}


export class UpdatePtProfileDto extends PartialType(CreatePtProfileDto) {}