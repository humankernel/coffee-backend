import { Supplier } from '../../users/entities/supplier.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

export enum OrderType {
  pending = 'pending',
  rejected = 'rejected',
  fullfiled = 'fullfiled',
}

@Entity()
export class PurchaseOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date', { name: 'created_at', default: new Date() })
  createdAt: Date;

  @Column('enum', { enum: OrderType, default: OrderType.pending })
  status: OrderType;

  @ManyToOne(() => Supplier, (supplier) => supplier.id)
  supplier: Supplier;

  @Column('simple-array')
  products: string[];
}
