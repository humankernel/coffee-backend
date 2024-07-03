import { SaleProduct } from 'src/sales/entities/sale-product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Drink } from './drink.entity';
import { Food } from './food.entity';

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

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'float', default: 0 })
  discount: number;

  @Column({ type: 'int', default: 0 })
  stars: number;

  @Column({ type: 'int', default: 0 })
  people: number;

  @OneToMany(() => SaleProduct, (saleProduct) => saleProduct.product)
  saleProduct: SaleProduct;
}
