import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Drink } from './entities/drink.entity';
import { Food } from './entities/food.entity';
import { RawProduct } from './entities/raw-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Drink, Food, RawProduct])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
