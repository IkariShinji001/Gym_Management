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

@Entity()
export class Managers {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Employees, (Employees) => Employees.manager)
  employees: Employees[];

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
