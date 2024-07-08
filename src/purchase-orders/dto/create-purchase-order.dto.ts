import { IsArray, IsEnum, IsInt } from 'class-validator';
import { OrderType } from '../entities/purchase-order.entity';

export class CreatePurchaseOrderDto {
  @IsEnum(OrderType)
  status: OrderType;

  @IsInt()
  supplier: number;

  @IsArray()
  products: string[];
}
