import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import * as streamifier from 'streamifier';
@Injectable()
export class CloudinaryService {
  async uploadFile(
    file: Express.Multer.File,
  ): Promise<UploadApiErrorResponse | UploadApiResponse> {
    return new Promise<UploadApiErrorResponse | UploadApiResponse>(
      (resolve, reject) => {
        const upload = v2.uploader.upload_stream((error, result) => {
          if (error) reject(error);
          resolve(result);
        });
        streamifier.createReadStream(file.buffer).pipe(upload);
      },
    );
  }
  async deleteImage(publicId: string) {
    await v2.uploader.destroy(publicId);
  }
}
