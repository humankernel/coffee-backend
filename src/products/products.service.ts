import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import {
  CreateProductDto,
  DrinkProductDto,
  FoodProductDto,
} from './dto/create-product.dto';
import {
  UpdateDrinkDto,
  UpdateFoodDto,
  UpdateProductDto,
} from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Food } from './entities/food.entity';
import { Drink } from './entities/drink.entity';
import { RawProduct } from './entities/raw-product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(RawProduct)
    private rawProductRepository: Repository<RawProduct>,
    @InjectRepository(Food) private foodRepository: Repository<Food>,
    @InjectRepository(Drink) private drinkRepository: Repository<Drink>,
  ) {}

  async createDrink(createDrinkDto: DrinkProductDto): Promise<Drink> {
    const insertedProduct = await this.create(createDrinkDto);

    const drink = this.drinkRepository.create(createDrinkDto);
    const insertedDrink = await this.drinkRepository.save(drink);

    return { ...insertedProduct, ...insertedDrink };
  }

  async createFood(createFoodDto: FoodProductDto): Promise<Food> {
    const insertedProduct = await this.create(createFoodDto);

    const food = this.foodRepository.create(createFoodDto);
    const insertedFood = await this.foodRepository.save(food);

    return { ...insertedProduct, ...insertedFood };
  }

  private async create(createProductDto: CreateProductDto): Promise<Product> {
    const alreadyExists = await this.productRepository.findOneBy({
      name: createProductDto.name,
    });

    if (alreadyExists)
      throw new ConflictException('product with that name already exists');

    return this.productRepository.save(createProductDto);
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Food | Drink | RawProduct> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product)
      throw new BadRequestException('product with that id does not exits');

    if (product.type === 'raw') {
      const rawProduct = await this.rawProductRepository.findOneBy({ id });
      return { ...product, ...rawProduct };
    } else if (product.type === 'drink') {
      const drink = await this.drinkRepository.findOneBy({ id });
      return { ...product, ...drink };
    } else if (product.type === 'food') {
      const food = await this.foodRepository.findOneBy({ id });
      return { ...product, ...food };
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    throw new Error('Method not implemented.');
  }

  async updateFood(id: number, updateProductDto: UpdateFoodDto) {
    throw new Error('Method not implemented.');
  }

  async updateDrink(arg0: number, updateProductDto: UpdateDrinkDto) {
    throw new Error('Method not implemented.');
  }

  async remove(id: number) {
    throw new Error('Method not implemented.');
  }
}
