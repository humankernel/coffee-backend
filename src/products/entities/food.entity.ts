import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;

  @Column({ length: 255 })
  foodType: string;

  @Column('simple-array')
  ingredients: string[];
}
