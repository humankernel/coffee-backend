import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class RawProduct {
  @PrimaryGeneratedColumn()
  @OneToOne(() => Product)
  @JoinColumn({ name: 'id' })
  id: number;

  @Column()
  stock: number;
}
