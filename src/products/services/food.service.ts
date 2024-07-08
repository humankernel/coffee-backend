import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Food } from '../entities/food.entity';
import { SearchParams } from '../dto/search-params.dto';
import { ProductsService } from './products.service';
import { UpdateFoodDto } from '../dto/update-product.dto';
import { FoodProductDto } from '../dto/create-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food) private foodRepository: Repository<Food>,
    private productService: ProductsService,
    private dataSource: DataSource,
  ) {}

  async create(createFoodDto: FoodProductDto): Promise<Food> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const foundProduct = await this.dataSource.manager.findOneBy(Product, {
        name: createFoodDto.name,
      });
      if (foundProduct) throw new ConflictException();

      const product = this.dataSource.manager.create(Product, createFoodDto);
      await this.dataSource.manager.save(Product, product);

      const food = this.dataSource.manager.create(Food, {
        ...createFoodDto,
        productId: product.id,
      });
      await this.dataSource.manager.save(Food, food);

      await queryRunner.commitTransaction();

      return { ...product, ...food };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(query: SearchParams): Promise<Food[]> {
    return this.foodRepository.find({
      relations: { product: true },
    });
  }

  async findOne(id: number): Promise<Food> {
    const foundFood = await this.foodRepository.findOneBy({ id });
    if (!foundFood) throw new NotFoundException();
    return foundFood;
  }

  async update(id: number, updateFoodDto: UpdateFoodDto): Promise<Food> {
    const product = await this.productService.update(id, updateFoodDto);
    const food = this.foodRepository.create(updateFoodDto);

    await this.foodRepository.update(id, food);
    return { ...product, ...food };
  }

  async remove(id: number): Promise<Food> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const foundProduct = await this.dataSource.manager.findOneBy(Product, {
        id,
      });
      if (!foundProduct) throw new NotFoundException();

      const foundFood = await this.foodRepository.findOneBy({
        productId: foundProduct.id,
      });
      if (!foundFood) throw new NotFoundException();

      await this.dataSource.manager.delete(Food, { id: foundFood.id });
      await this.dataSource.manager.delete(Product, { id: foundProduct.id });

      await queryRunner.commitTransaction();

      return { ...foundProduct, ...foundFood };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
