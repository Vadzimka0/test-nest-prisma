import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import type { User as UserType } from '@prisma/client';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryParamsDto } from 'src/user/dto/query-params.dto';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Roles, User } from 'src/auth/decorators';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @User() currentUser: UserType,
  ) {
    const post = await this.postService.create(createPostDto, currentUser.id);

    return { data: post };
  }

  @Get()
  async findAll(@Query() { skip, take, query }: QueryParamsDto) {
    const posts = await this.postService.findAll(skip, take, query);

    return { data: posts, count: posts.length };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postService.findOne(id);

    return { data: post };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @User() currentUser: UserType,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const post = await this.postService.update(
      id,
      currentUser.id,
      updatePostDto,
    );

    return { data: post };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string, @User() currentUser: UserType) {
    return this.postService.remove(id, currentUser);
  }
}
