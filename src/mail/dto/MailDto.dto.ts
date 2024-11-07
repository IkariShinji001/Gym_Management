import {
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';

class From {
  name: string;

  address: string;
}

export class SendMailDto {
  @IsEmail({}, { each: true })
  @IsNotEmpty()
  recipients: Partial<string[]>;

  from: From;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  html: string;

  files?: Express.Multer.File[];
}
