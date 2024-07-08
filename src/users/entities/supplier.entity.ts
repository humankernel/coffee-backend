import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  phone: string;

  @Column({ length: 255 })
  email: string;

  @Column()
  sales: number;

  @Column('simple-array')
  products: string[];
}
