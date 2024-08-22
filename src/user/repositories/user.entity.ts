import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  gender: boolean;

  @Column()
  dateBirth: Date;

  @Column()
  phoneNumber: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
