import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Drink } from '../entities/drink.entity';
import { DrinkProductDto } from '../dto/create-product.dto';
import { SearchParams } from '../dto/search-params.dto';
import { ProductsService } from './products.service';
import { UpdateDrinkDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class DrinkService {
  constructor(
    @InjectRepository(Drink) private drinkRepository: Repository<Drink>,
    private productService: ProductsService,
    private dataSource: DataSource,
  ) {}

  async create(createDrinkDto: DrinkProductDto): Promise<Drink> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const foundProduct = await this.dataSource.manager.findOneBy(Product, {
        name: createDrinkDto.name,
      });
      if (foundProduct) throw new ConflictException();

      const product = this.dataSource.manager.create(Product, createDrinkDto);
      await this.dataSource.manager.save(Product, product);

      const drink = this.dataSource.manager.create(Drink, {
        ...createDrinkDto,
        productId: product.id,
      });
      await this.dataSource.manager.save(Drink, drink);

      await queryRunner.commitTransaction();

      return { ...product, ...drink };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(query: SearchParams) {
    return this.drinkRepository.find({
      relations: { product: true },
    });
  }

  async findOne(id: number): Promise<Drink> {
    const foundDrink = await this.drinkRepository.findOneBy({ id });
    if (!foundDrink) throw new NotFoundException();
    return foundDrink;
  }

  async update(id: number, updateDrinkDto: UpdateDrinkDto): Promise<Drink> {
    const product = await this.productService.update(id, updateDrinkDto);
    const drink = this.drinkRepository.create(updateDrinkDto);

    await this.drinkRepository.update(id, drink);
    return { ...product, ...drink };
  }

  async remove(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const foundProduct = await this.dataSource.manager.findOneBy(Product, {
        id,
      });
      if (!foundProduct) throw new NotFoundException();

      const foundDrink = await this.drinkRepository.findOneBy({
        productId: foundProduct.id,
      });
      if (!foundDrink) throw new NotFoundException();

      await this.dataSource.manager.delete(Drink, { id: foundDrink.id });
      await this.dataSource.manager.delete(Product, { id: foundProduct.id });

      await queryRunner.commitTransaction();

      return { ...foundProduct, ...foundDrink };
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
