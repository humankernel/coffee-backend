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
  @OneToOne(() => Product)
  @JoinColumn({ name: 'id' })
  id: number;

  @Column({ length: 255 })
  food_type: string;

  @Column('simple-array')
  ingredients: string[];
}
