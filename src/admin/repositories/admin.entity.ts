import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  manager = 'manager',
  employee = 'employee',
  pt = 'pt',
}

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false, enum: Role })
  role: Role;
}
