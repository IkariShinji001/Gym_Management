import { PtImages } from '../repositories/ptImages.entity';

export interface IPtImagesService {
  findAll(): Promise<PtImages[]>;
  findOne(id: number): Promise<PtImages>;
  addImage(newImage: string, idPt: number): Promise<PtImages>;
  delete(id: number): Promise<void>;
}
