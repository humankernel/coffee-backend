import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { Role, User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { LoginRes } from './types/login.response';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginRes> {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user)
      throw new UnauthorizedException('username or password are incorrect');

    const payload = { sub: user.id, username: user.username, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }

  async register(registerDto: RegisterDto) {
    const userInDB = await this.usersService.findByUsername(
      registerDto.username,
    );
    if (userInDB) throw new ConflictException('the user already exists');

    // hash password
    const hashedPassword = await this.hashPassword(registerDto.password);
    const userToStore = {
      ...registerDto,
      password: hashedPassword,
      role: Role.customer,
    };

    // create user
    const user = await this.usersService.create(userToStore);

    // create token
    const payload = { sub: user.id, username: user.username, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }

  private async hashPassword(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, 10);
  }

  private async validateUser(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    if (!user) return null;

    const passwordMatch = await this.validatePassword(password, user.password);
    if (passwordMatch) return user;

    return null;
  }

  private async validatePassword(
    plain: string,
    encrypted: string,
  ): Promise<boolean> {
    return bcrypt.compare(plain, encrypted);
  }
}
