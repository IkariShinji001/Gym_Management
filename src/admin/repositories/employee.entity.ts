import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Managers } from './manager.entity';
import { Profile } from './profile.entity';

@Entity()
export class Employees {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  position: string;

  @Column({ nullable: false })
  hireDate: Date;

  @ManyToOne(() => Managers, (Managers) => Managers.employees)
  manager: Managers;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
