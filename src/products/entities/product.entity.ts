import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum ProductType {
  food = 'food',
  drink = 'drink',
  raw = 'raw',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  desc: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'enum', enum: ProductType })
  type: ProductType;
}
