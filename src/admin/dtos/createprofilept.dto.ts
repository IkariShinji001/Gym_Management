import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './profile.dto';
import { CreatePtDto } from './pt.dto';

export class CreatePtProfileDto {
    createProfileDto: CreateProfileDto;
    createPtDto: CreatePtDto;
}

