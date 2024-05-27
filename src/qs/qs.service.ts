import { Injectable } from '@nestjs/common';
import { CreateQDto } from './dto/create-q.dto';
import { UpdateQDto } from './dto/update-q.dto';

@Injectable()
export class QsService {
  create(createQDto: CreateQDto) {
    return 'This action adds a new q';
  }

  findAll() {
    return `This action returns all qs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} q`;
  }

  update(id: number, updateQDto: UpdateQDto) {
    return `This action updates a #${id} q`;
  }

  remove(id: number) {
    return `This action removes a #${id} q`;
  }
}
