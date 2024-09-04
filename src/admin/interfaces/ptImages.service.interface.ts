import { PtImages } from '../repositories/ptImages.entity';

export interface IPtImagesService {
  findAll(): Promise<PtImages[]>;
  addImage(imageUrl: string, idPt: number): Promise<PtImages>;
  delete(id: number): Promise<void>;
}
