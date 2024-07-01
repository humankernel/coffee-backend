import { ConflictException, Injectable } from '@nestjs/common';
import { CreateQDto } from './dto/create-q.dto';
import { UpdateQDto } from './dto/update-q.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QS } from './entities/qs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QsService {
  constructor(@InjectRepository(QS) private qsRepository: Repository<QS>) {}

  async create(createQsDto: CreateQDto): Promise<QS> {
    const qsInDB = await this.qsRepository.findOneBy({
      desc: createQsDto.desc,
    });
    if (qsInDB)
      throw new ConflictException('complaint or suggestion already exists');

    const qs = this.qsRepository.create(createQsDto);
    return this.qsRepository.save(qs);
  }

  async findAll(): Promise<QS[]> {
    return this.qsRepository.find();
  }

  async findOne(id: number): Promise<QS> {
    return this.qsRepository.findOneBy({ id });
  }

  async update(id: number, updateQsDto: UpdateQDto) {
    return this.qsRepository.update({ id }, updateQsDto);
  }

  async remove(id: number) {
    return this.qsRepository.delete({ id });
  }
}
