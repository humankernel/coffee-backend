import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';
import { SaleProduct } from './entities/sale-product.entity';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private saleRepository: Repository<Sale>,
    @InjectRepository(SaleProduct)
    private saleProductRepository: Repository<SaleProduct>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}
  async create(createSaleDto: CreateSaleDto) {
    const user = await this.usersService.findOne(createSaleDto.userId);
    if (!user) throw new NotFoundException('user does not exists');

    for (const cartItem of createSaleDto.cart) {
      const product = await this.productsService.findOne(cartItem.id);
      if (!product) throw new NotFoundException('product does not exists');

      const sale = this.saleRepository.create({
        user,
        createdAt: new Date(),
      });
      const saleInDB = await this.saleRepository.save(sale);

      const productSale = this.saleProductRepository.create({
        sale: saleInDB,
        product: product,
        amount: cartItem.count,
      });
      await this.saleProductRepository.save(productSale);
    }

    return 'This action adds a new sale';
  }

  async findAll(): Promise<SaleProduct[]> {
    return this.saleProductRepository.find({
      relations: { sale: { user: true }, product: true },
      select: {
        sale: {
          id: true,
          user: { id: true, name: true, username: true },
          createdAt: true,
        },
        product: { id: true, name: true, price: true },
        amount: true,
      },
    });
  }

  async findOne(id: number) {
    return this.saleRepository.findOneBy({ id });
  }

  // FIX:
  async update(id: number, updateSaleDto: any) {
    return this.saleRepository.update({ id }, updateSaleDto);
  }

  remove(id: number) {
    return this.saleRepository.delete({ id });
  }
}
