import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QsService } from './qs.service';
import { CreateQDto } from './dto/create-q.dto';
import { UpdateQDto } from './dto/update-q.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('qs')
@Controller('qs')
export class QsController {
  constructor(private readonly qsService: QsService) {}

  @Post()
  create(@Body() createQDto: CreateQDto) {
    return this.qsService.create(createQDto);
  }

  @Get()
  findAll() {
    return this.qsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQDto: UpdateQDto) {
    return this.qsService.update(+id, updateQDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qsService.remove(+id);
  }
}
