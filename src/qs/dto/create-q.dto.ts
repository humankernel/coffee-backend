import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { QsType } from '../entities/qs.entity';

export class CreateQDto {
  @ApiProperty({ example: 'food is a shit' })
  @IsString()
  desc: string;

  @ApiProperty({ example: QsType.complaint })
  @IsEnum(QsType)
  type: QsType;
}
