import { IsDefined, IsEnum, IsString } from 'class-validator';
import { Role } from 'src/users/entities/user.entity';

export class RegisterDto {
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
