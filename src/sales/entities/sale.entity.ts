import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SaleProduct } from './sale-product.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  createdAt: Date;

  @OneToMany(() => SaleProduct, (saleProduct) => saleProduct.sale)
  saleProduct: SaleProduct[];
}
