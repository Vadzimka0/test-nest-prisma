import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Query,
  Put,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import type { User as UserType } from '@prisma/client';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Roles, User } from '../auth/decorators';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @Get()
  async findAll(@Query() { skip, take, query }: QueryParamsDto) {
    const users = await this.userService.findAll(skip, take, query);

    return { data: users, count: users.length };
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @User() currentUser: UserType) {
    const user = await this.userService.findOne(id, currentUser);

    return { data: user };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @User() currentUser: UserType,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.update(id, currentUser, updateUserDto);

    return { data: user };
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string, @User() currentUser: UserType) {
    return this.userService.remove(id, currentUser);
  }
}
