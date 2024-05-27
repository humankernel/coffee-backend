import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @Column()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: ['missing', 'surplus'],
  })
  type: string;
}
