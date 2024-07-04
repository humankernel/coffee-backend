import {
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String, example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ type: Number, example: 18 })
  @IsNumber()
  age: number;

  @ApiProperty({ type: String, example: 'john' })
  @IsString()
  username: string;

  @ApiProperty({ type: String, example: 'Admin.1234' })
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;

  @ApiProperty({ enum: Role, example: 'manager' })
  @IsEnum(Role)
  role: Role;
}
