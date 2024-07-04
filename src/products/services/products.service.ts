import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import {
  FindOptionsOrderValue,
  FindOptionsUtils,
  ILike,
  Repository,
} from 'typeorm';
import { SearchParams } from '../dto/search-params.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name } = createProductDto;
    const existingProduct = await this.productRepository.findOneBy({ name });

    if (existingProduct)
      throw new ConflictException(`product with name "${name}" already exists`);

    const newProduct = this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct);
  }

  async findAll({ sort, filter }: SearchParams): Promise<Product[]> {
    const orderOps = {
      newest: 'ASC',
      oldest: 'DESC',
    };
    let order = 'ASC';
    if (sort) order = orderOps[sort];

    return this.productRepository.find({
      where: { name: filter ? ILike(`%${filter}%`) : undefined },
      order: { createdAt: order as FindOptionsOrderValue },
    });
  }

  async findOne(id: number): Promise<Product> {
    const existingProduct = await this.productRepository.findOneBy({ id });
    if (!existingProduct)
      throw new NotFoundException(`product with id "${id}" does not exits`);
    return existingProduct;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const existingProduct = await this.findOne(id);
    if (!existingProduct)
      throw new NotFoundException(`product with id "${id}" does not exits`);

    const product = this.productRepository.create(updateProductDto);
    await this.productRepository.update(id, product);

    const updatedProduct = this.findOne(id);
    return updatedProduct;
  }

  async remove(id: number): Promise<Product> {
    const existingProduct = await this.findOne(id);
    if (!existingProduct)
      throw new NotFoundException('Product with that id does not exists');

    await this.productRepository.delete({ id });
    return existingProduct;
  }
}
