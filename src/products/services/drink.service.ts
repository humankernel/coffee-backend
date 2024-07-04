import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drink } from '../entities/drink.entity';
import { DrinkProductDto } from '../dto/create-product.dto';
import { SearchParams } from '../dto/search-params.dto';
import { ProductsService } from './products.service';
import { UpdateDrinkDto } from '../dto/update-product.dto';

@Injectable()
export class DrinkService {
  constructor(
    @InjectRepository(Drink) private drinkRepository: Repository<Drink>,
    @Inject() private productService: ProductsService,
  ) {}

  async create(createDrinkDto: DrinkProductDto): Promise<Drink> {
    const product = await this.productService.create(createDrinkDto);
    const drink = this.drinkRepository.create(createDrinkDto);
    return this.drinkRepository.save({ ...drink, product });
  }

  async findAll(query: SearchParams) {
    return this.drinkRepository.find({
      relations: { product: true },
    });
  }

  async findOne(id: number): Promise<Drink> {
    const product = await this.productService.findOne(id);
    const drink = await this.drinkRepository.findOneBy({ id });
    return { ...product, ...drink };
  }

  async updateDrink(
    id: number,
    updateDrinkDto: UpdateDrinkDto,
  ): Promise<Drink> {
    const product = await this.productService.update(id, updateDrinkDto);
    const drink = this.drinkRepository.create(updateDrinkDto);

    await this.drinkRepository.update(id, drink);
    return { ...product, ...drink };
  }

  async remove(id: number): Promise<Drink> {
    const product = this.productService.remove(id);
    const drink = this.findOne(id);

    await this.drinkRepository.delete(id);
    return { ...product, ...drink };
  }
}
