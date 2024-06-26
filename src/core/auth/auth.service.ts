import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
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
    console.log(registerDto);
  }

  private async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    if (!user) return null;

    const passwordMatch = await this.validatePassword(pass, user.password);
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
