import {
  ChildEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PtImages } from './ptImages.entity';
import { Profile } from './profile.entity';
import { PtPackages } from 'src/service-package/repositories/ptPackage.entity';

@Entity()
export class Pt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  weight: string;

  @Column({ nullable: false })
  height: string;

  @Column({ nullable: false })
  bust: string;

  @Column({ nullable: false })
  waist: string;

  @Column({ nullable: false })
  hips: string;

  @OneToMany(() => PtImages, (PtImages) => PtImages.pt)
  images: PtImages[];

  @OneToMany(() => PtPackages,(ptPackage) => ptPackage.pt)
  ptPackages: PtPackages

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
