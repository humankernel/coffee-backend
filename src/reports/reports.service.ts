import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { ProductsService } from '../products/services/products.service';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
    private readonly productsService: ProductsService,
  ) {}

  async create(createReportDto: CreateReportDto) {
    const foundReport = await this.reportRepository.findOneBy({
      desc: createReportDto.desc,
      type: createReportDto.type,
    });
    if (foundReport) throw new ConflictException('report already exists');

    const foundProduct = await this.productsService.findOne(
      createReportDto.productId,
    );
    if (!foundProduct)
      throw new NotFoundException(
        `not product with id ${createReportDto.productId}`,
      );

    const report = this.reportRepository.create({
      ...createReportDto,
      product: foundProduct,
    });
    return this.reportRepository.save(report);
  }

  async findAll() {
    return this.reportRepository.find({
      relations: {
        product: true,
      },
      select: {
        id: true,
        type: true,
        desc: true,
        createdAt: true,
        product: {
          id: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const foundReport = await this.reportRepository.findOneBy({ id });
    if (!foundReport) throw new NotFoundException();
    return foundReport;
  }

  async remove(id: number) {
    const foundReport = await this.reportRepository.findOneBy({ id });
    if (!foundReport) throw new NotFoundException();
    await this.reportRepository.delete(id);
    return foundReport;
  }
}
