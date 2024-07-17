import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Query,
  Put,
  HttpCode,
} from '@nestjs/common';

import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryParamsDto } from './dto/query-params.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //TODO: only for ADMIN users
  @Get()
  async findAll(@Query() { skip, take, query }: QueryParamsDto) {
    const users = await this.userService.findAll(skip, take, query);

    return { data: users, count: users.length };
  }

  //TODO: only for ADMIN and current USER
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);

    return { data: user };
  }

  //TODO: only for ADMIN and current USER
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);

    return { data: user };
  }

  //TODO: only for ADMIN and current USER
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
