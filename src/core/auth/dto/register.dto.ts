import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 20 })
  @IsNumber()
  age: number;

  @ApiProperty({ example: 'john' })
  @IsString()
  username: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  password: string;
}
