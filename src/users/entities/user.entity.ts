import { Sale } from 'src/sales/entities/sale.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  manager = 'manager',
  almacenero = 'almacenero',
  customer = 'customer',
  supplier = 'supplier',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ length: 255 })
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.customer })
  role: Role;

  @OneToMany(() => Sale, (sale) => sale.user)
  sale: Sale;
}
