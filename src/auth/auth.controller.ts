import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import type { User as UserType } from '@prisma/client';

import { AuthService } from './auth.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { User } from 'src/auth/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() authDto: AuthDto) {
    const token = await this.authService.login(authDto);

    return { data: token };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  authenticate(@User() currentUser: UserType) {
    return { data: currentUser };
  }
}
