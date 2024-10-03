import {
  ChildEntity,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Employees } from './employee.entity';
import { Pt } from './pt.entity';

@Entity()
export class Managers {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Employees, (Employees) => Employees.manager)
  employees: Employees[];

  @OneToMany(() => Pt, (Pt) => Pt.manager)
  pt: Pt[];

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  // branchId: number;
}
