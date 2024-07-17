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
} from '@nestjs/common';
// import { Role } from '@prisma/client';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryParamsDto } from 'src/user/dto/query-params.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  //TODO: only for Auth User
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const post = await this.postService.create(createPostDto);

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

  //TODO: only for User-Author
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const post = await this.postService.update(id, updatePostDto);

    return { data: post };
  }

  //TODO: only for - Admin or User-Author
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
