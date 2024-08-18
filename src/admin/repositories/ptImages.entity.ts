import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Pt } from './pt.entity';

@Entity()
export class PtImages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  imageUrl: string;

  @ManyToOne(() => Pt, (Pt) => Pt.images)
  pt: Pt;
}
