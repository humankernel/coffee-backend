import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    if (!user.isActive) throw new UnauthorizedException('user is inactive');

    const payload = { sub: user.id, username: user.username, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }

  async register(registerDto: RegisterDto) {
    return this.usersService.create({ ...registerDto, role: Role.customer });
  }

  private async validateUser(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    if (!user) return null;

    const passwordMatch = await this.comparePasswords(password, user.password);
    if (!passwordMatch) return null;

    return user;
  }

  private async comparePasswords(
    plain: string,
    hashed: string,
  ): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
