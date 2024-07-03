import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Sale } from './sale.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class SaleProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sale, (sale) => sale.saleProduct)
  sale: Sale;

  @ManyToOne(() => Product, (product) => product.saleProduct)
  product: Product;

  @Column()
  amount: number;
}
