import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

export enum Size {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

export enum Temp {
  cold = 'cold',
  hot = 'hot',
}

@Entity()
export class Drink {
  @PrimaryGeneratedColumn()
  @OneToOne(() => Product)
  @JoinColumn({ name: 'id' })
  id: number;

  @Column({ type: 'enum', enum: Size })
  size: Size;

  @Column({ type: 'boolean' })
  sugar: boolean;

  @Column({ type: 'enum', enum: Temp })
  temp: Temp;

  @Column({ length: 255 })
  drink_type: string;
}
