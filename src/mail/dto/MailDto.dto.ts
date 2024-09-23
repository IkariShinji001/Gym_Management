import {
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsArray
} from 'class-validator';

class From {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  address: string;
}

export class SendMailDto {
  @IsArray()
  @IsEmail({}, { each: true })
  @IsNotEmpty()
  recipients: string[];

  @IsNotEmpty()
  from: From;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()  
  @IsNotEmpty()
  html: string;
}
