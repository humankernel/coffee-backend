import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guards/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from 'src/users/entities/user.entity';
import { RolesGuard } from './guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Roles(Role.manager)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/profile')
  async getProfile() {
    return 'profile info';
  }
}
