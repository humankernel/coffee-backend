import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class PurchaseOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Supplier)
  supplier: Supplier;

  @Column()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: ['pending', 'rejected', 'fulfilled'],
  })
  status: string;
}
