import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { Repository } from 'typeorm';
import { SuppliersService } from '../users/services/suppliers.service';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';

@Injectable()
export class PurchaseOrdersService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private purchaseOrderRepository: Repository<PurchaseOrder>,
    private supplierService: SuppliersService,
  ) {}

  async create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    const foundSupplier = await this.supplierService.findOne(
      createPurchaseOrderDto.supplier,
    );
    if (!foundSupplier)
      throw new NotFoundException("the supplier doesn't exists");

    const foundOrder = await this.purchaseOrderRepository.findOneBy({
      supplier: foundSupplier,
    });
    if (foundOrder) throw new ConflictException();

    const order = this.purchaseOrderRepository.create({
      ...createPurchaseOrderDto,
      supplier: foundSupplier,
    });

    return this.purchaseOrderRepository.save(order);
  }

  async findAll() {
    return this.purchaseOrderRepository.find();
  }

  async findOne(id: number) {
    return this.purchaseOrderRepository.findOneBy({ id });
  }

  async update(id: number, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    const foundOrder = this.purchaseOrderRepository.findOneBy({ id });
    if (!foundOrder)
      throw new NotFoundException('order with that id does not exist');

    await this.purchaseOrderRepository.update(id, updatePurchaseOrderDto);
    return foundOrder;
  }

  async remove(id: number) {
    const foundOrder = this.purchaseOrderRepository.findOneBy({ id });
    if (!foundOrder)
      throw new NotFoundException('order with that id does not exist');

    await this.purchaseOrderRepository.delete(id);
    return foundOrder;
  }
}
