import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('text')
  description: string;

  @Column('float')
  price: number;

  @Column({
    type: 'enum',
    enum: ['menu', 'raw'],
  })
  type: string;
}

@Entity()
export class Drink {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;

  @Column({
    type: 'enum',
    enum: ['sm', 'md', 'lg'],
  })
  size: string;

  @Column('boolean')
  sugar: boolean;

  @Column({
    type: 'enum',
    enum: ['cold', 'hot'],
  })
  temp: string;

  @Column({ length: 255 })
  drinkType: string;
}

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
