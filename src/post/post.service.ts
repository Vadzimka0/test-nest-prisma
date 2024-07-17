import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        authorId: '9c7eb841-cb84-4b05-9487-9d29cb89f1a9',
      },
    });
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({ where: { id } });

    if (!post) {
      throw new UnprocessableEntityException(`Post with id ${id} not found`);
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);

    //TODO: check if (post.authorId !== user from token) then - Forbidden

    return this.prisma.post.update({
      where: { id },
      data: {
        ...updatePostDto,
      },
    });
  }

  async remove(id: string) {
    const post = await this.findOne(id);

    //TODO:
    // if (userRole === Role.ADMIN || post.authorId === userId ) {
    return this.prisma.post.delete({ where: { id } });
    // }

    //   throw new ForbiddenException(
    //     'You do not have permission to delete this post',
    //   );
  }
}
