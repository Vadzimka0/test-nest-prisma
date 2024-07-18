import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import type { User as UserType } from '@prisma/client';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  create(createPostDto: CreatePostDto, authorId: string) {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        authorId,
      },
    });
  }

  findAll(skip?: number, take?: number, query?: string) {
    return this.prisma.post.findMany({
      skip,
      take,
      where: {
        OR: [
          {
            title: { contains: query },
          },
          {
            content: { contains: query },
          },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return post;
  }

  async update(
    id: string,
    currentUserId: string,
    updatePostDto: UpdatePostDto,
  ) {
    const post = await this.findOne(id);

    if (post.authorId !== currentUserId) {
      throw new ForbiddenException(
        'You do not have permission to update this post',
      );
    }

    return this.prisma.post.update({
      where: { id },
      data: {
        ...updatePostDto,
      },
    });
  }

  async remove(id: string, currentUser: UserType) {
    const post = await this.findOne(id);

    if (currentUser.role === Role.ADMIN || post.authorId === currentUser.id) {
      return this.prisma.post.delete({ where: { id } });
    }

    throw new ForbiddenException(
      'You do not have permission to delete this post',
    );
  }
}
