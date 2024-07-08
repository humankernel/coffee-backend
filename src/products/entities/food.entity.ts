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

  @Column('varchar', { length: 255 })
  foodType: string;

  @Column('simple-array')
  ingredients: string[];

  @OneToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column('int', { name: 'product_id' })
  productId: number;
}
