import { Controller, Post, Body,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);

    return {
      status: 201,
      message: 'Registrasi successfully',
      data: user,
    };
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const token = await this.authService.login(dto.email, dto.password);

    return {
      status: 200,
      message: 'Login successfully',
      data: token,
    };
  }

  // POST /api/auth/logout
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout() {
    return { message: 'Logout success' }
  }
}
