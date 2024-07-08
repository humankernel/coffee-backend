import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { SaleProduct } from './entities/sale-product.entity';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, SaleProduct]),
    UsersModule,
    ProductsModule,
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
