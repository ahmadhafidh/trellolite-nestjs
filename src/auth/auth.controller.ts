import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiResponse } from '../common/helpers/api-response.helper';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);

    return ApiResponse.success(
      user,
      'Register successfully',
      201,
    );
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const token = await this.authService.login(
      dto.email,
      dto.password,
    );

    return ApiResponse.success(
      token,
      'Login successfully',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout() {
    return ApiResponse.success(
      undefined,
      'Logout successfully',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@CurrentUser() user) {
    const data = await this.authService.me(user.id);

    return ApiResponse.success(
      data,
      'Data user',
    );
  }
}
