import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Role } from 'src/users/entities/user.entity';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'john' })
  @IsString()
  username: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  password: string;

  @ApiProperty({ enum: Role, example: 'customer' })
  @IsEnum(Role)
  role: Role;
}
