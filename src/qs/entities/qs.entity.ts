import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QS {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @Column()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: ['complaint', 'suggestion'],
  })
  type: string;
}
