import { IsDefined, IsEnum, IsString } from 'class-validator';
import { Role } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  username: string;

  @IsDefined()
  @IsString()
  password: string;

  @IsDefined()
  @IsEnum(Role)
  role: Role;
}
