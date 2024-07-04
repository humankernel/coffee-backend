import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Food } from '../entities/food.entity';
import { SearchParams } from '../dto/search-params.dto';
import { ProductsService } from './products.service';
import { UpdateFoodDto } from '../dto/update-product.dto';
import { FoodProductDto } from '../dto/create-product.dto';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food) private foodRepository: Repository<Food>,
    private productService: ProductsService,
    private dataSource: DataSource,
  ) {}

  async create(createFoodDto: FoodProductDto): Promise<Food> {
    const product = await this.productService.create(createFoodDto);
    const drink = this.foodRepository.create(createFoodDto);
    return this.foodRepository.save({ ...drink, product });
  }

  async findAll(query: SearchParams) {
    return this.foodRepository.find({
      relations: { product: true },
    });
  }

  async findOne(id: number): Promise<Food> {
    const product = await this.productService.findOne(id);
    const drink = await this.foodRepository.findOneBy({ id });
    return { ...product, ...drink };
  }

  async update(id: number, updateFoodDto: UpdateFoodDto): Promise<Food> {
    const product = await this.productService.update(id, updateFoodDto);
    const drink = this.foodRepository.create(updateFoodDto);

    await this.foodRepository.update(id, drink);
    return { ...product, ...drink };
  }

  async remove(id: number): Promise<Food> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const product = await this.productService.findOne(id);
      const food = await this.foodRepository.findOneBy({ product });
      await this.foodRepository.delete({ id: food.id });
      const deletedProduct = await this.productService.remove(id);
      return { ...deletedProduct, ...food };
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
