import {
  ChildEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PtImages } from './ptImages.entity';
import { Profile } from './profile.entity';
import { PtPackages } from 'src/service-package/repositories/ptPackage.entity';
import { Managers } from './manager.entity';

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

  @Column({ nullable: false })
  fbLink: string;

  @OneToMany(() => PtImages, (PtImages) => PtImages.pt,  {cascade: true, onDelete: 'CASCADE'})
  images: PtImages[];

  @OneToMany(() => PtPackages, (ptPackage) => ptPackage.pt)
  ptPackages: PtPackages[]

  @OneToOne(() => Profile,  {cascade: true, onDelete: 'CASCADE'})
  @JoinColumn()
  profile: Profile;
  
  @ManyToOne(() => Managers, (Managers) => Managers.pt)
  manager: Managers;

}
