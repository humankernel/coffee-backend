import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Drink } from './entities/drink.entity';
import { Food } from './entities/food.entity';
import { RawProduct } from './entities/raw-product.entity';
import { FoodController } from './controllers/food.controller';
import { DrinkController } from './controllers/drink.controller';
import { FoodService } from './services/food.service';
import { DrinkService } from './services/drink.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Drink, Food, RawProduct])],
  controllers: [FoodController, DrinkController],
  providers: [ProductsService, FoodService, DrinkService],
  exports: [ProductsService],
})
export class ProductsModule {}
