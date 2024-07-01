import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({ example: '53452345' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: 'johndoe@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 20 })
  @IsNumber()
  sales: number;
  //   products: string[];
}
