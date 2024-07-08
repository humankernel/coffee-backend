import { Product } from '../../products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

export enum ReportType {
  missing = 'missing',
  surplus = 'surplus',
}

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  desc: string;

  @Column('date', { name: 'created_at', default: new Date() })
  createdAt: Date;

  @Column('enum', { enum: ReportType })
  type: ReportType;

  @ManyToOne(() => Product, (product) => product.report)
  product: Product;

  // @Column('int', { name: 'product_id' })
  // productId: number;
}
