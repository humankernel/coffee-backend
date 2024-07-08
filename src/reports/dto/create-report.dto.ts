import { IsEnum, IsInt, IsString } from 'class-validator';
import { ReportType } from '../entities/report.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty({ example: 'product1 is out of stock' })
  @IsString()
  desc: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  productId: number;

  @ApiProperty({ example: ReportType.missing })
  @IsEnum(ReportType)
  type: ReportType;
}
