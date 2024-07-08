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
  id: number;

  @Column('enum', { enum: Size })
  size: Size;

  @Column('enum', { enum: Temp })
  temp: Temp;

  @Column('varchar', { name: 'drink_type', length: 255 })
  drinkType: string;

  @OneToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column('int', { name: 'product_id' })
  productId: number;
}
