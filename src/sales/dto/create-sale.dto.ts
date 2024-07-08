import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  Min,
  ValidateNested,
} from 'class-validator';

export class CartItem {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  amount: number;
}

export class CreateSaleDto {
  @ApiProperty({ example: '1' })
  @IsInt()
  userId: number;

  @ApiProperty({ example: [{ id: 1, amount: 3 }] })
  @ValidateNested({ each: true })
  @Type(() => CartItem)
  products: CartItem[];
}

export class SaleDto {
  @IsInt()
  user: number;

  @IsDate()
  createdAt: Date;
}
