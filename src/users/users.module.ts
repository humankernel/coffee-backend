import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Supplier } from './entities/supplier.entity';
import { SuppliersController } from './controllers/suppliers.controller';
import { SuppliersService } from './services/suppliers.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Supplier])],
  controllers: [UsersController, SuppliersController],
  providers: [UsersService, SuppliersService],
  exports: [UsersService, SuppliersService],
})
export class UsersModule {}
