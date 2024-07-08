import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  manager = 'manager',
  almacenero = 'almacenero',
  supplier = 'supplier',
  customer = 'customer',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.customer })
  role: Role;

  @Column({ name: 'is_active', type: 'bool', default: true })
  isActive: boolean;
}
