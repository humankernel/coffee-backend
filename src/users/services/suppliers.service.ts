import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from '../entities/supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async create(createSupplierDto: CreateSupplierDto) {
    return this.supplierRepository.save(createSupplierDto);
  }

  async findAll() {
    return this.supplierRepository.find();
  }

  async findOne(id: number) {
    return this.supplierRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return this.supplierRepository.delete(id);
  }
}
