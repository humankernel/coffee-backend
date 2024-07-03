import { PartialType } from '@nestjs/mapped-types';
import { SaleDto } from './create-sale.dto';

export class UpdateSaleDto extends PartialType(SaleDto) {}
