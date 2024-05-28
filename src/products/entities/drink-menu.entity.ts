import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Drink {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;

  @Column({
    type: 'enum',
    enum: ['sm', 'md', 'lg'],
  })
  size: string;

  @Column('boolean')
  sugar: boolean;

  @Column({
    type: 'enum',
    enum: ['cold', 'hot'],
  })
  temp: string;

  @Column({ length: 255 })
  drinkType: string;
}
