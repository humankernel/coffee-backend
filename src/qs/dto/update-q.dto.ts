import { PartialType } from '@nestjs/mapped-types';
import { CreateQDto } from './create-q.dto';

export class UpdateQDto extends PartialType(CreateQDto) {}
