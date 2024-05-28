import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Sale } from './sale.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class SaleProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sale)
  sale: Sale;

  // FIX:
  // @ManyToOne(() => Product)
  // product: Product;

  @Column()
  amount: number;
}
