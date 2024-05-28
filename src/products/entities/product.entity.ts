import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('text')
  description: string;

  @Column('float')
  price: number;

  @Column({
    type: 'enum',
    enum: ['menu', 'raw'],
  })
  type: string;
}
