import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Facilities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  maintenanceDate: Date;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  imageUrl: string;
}
