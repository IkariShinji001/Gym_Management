import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/upload')
export class CloudinaryController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    try {
      const result = await this.cloudinaryService.uploadFile(file);
      return {
        secure_url: result.secure_url,
        public_id: result.public_id,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Image upload failed', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':publicId')
  async deleteImage(@Param('publicId') publicId: string): Promise<void> {
    await this.cloudinaryService.deleteImage(publicId);
  }
}
