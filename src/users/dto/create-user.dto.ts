import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Role } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe' })
  @IsString()
  name: string;

  //FIX:
  @ApiProperty({ example: '18' })
  @IsString()
  age: number;

  @ApiProperty({ example: 'john' })
  @IsString()
  username: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  password: string;

  @ApiProperty({ enum: Role, example: 'manager' })
  @IsEnum(Role)
  role: Role;
}
